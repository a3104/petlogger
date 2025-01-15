"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Pet } from "../models/pet";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Box,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";
import AddWeights from "./addWeights";
import PetWeights from "./petWeights";

const PETS_LOCAL_STORAGE_KEY = "pets";

export default function PetSelector() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPetId, setSelectedPetId] = useState<number | "">("");
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isNew, setIsNew] = useState(false);

    const fetchPets = useCallback(() => {
        setLoading(true);
        setError(null);
        try {
            const localstorageData = localStorage.getItem(PETS_LOCAL_STORAGE_KEY);
            if (localstorageData) {
                const parsedPets = JSON.parse(localstorageData) as any[];
                const fetchedPets: Pet[] = parsedPets.map((pet) =>
                    Object.assign(new Pet(), pet)
                );
                setPets(fetchedPets);
            } else {
                setPets([]); // No pets found
            }
        } catch (e: any) {
            console.error("Error fetching pets from local storage:", e);
            setError("ペットの読み込みに失敗しました。");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

    const handleChange = useCallback(
        (event: SelectChangeEvent<number>) => {
            const petId = event.target.value as number;
            setSelectedPetId(petId);
            const selectedPet = pets.find((pet) => pet.id === petId);
            if (selectedPet) {
                setSelectedPet(selectedPet);
            }
        },
        [pets]
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={2}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
                <FormControl fullWidth>
                    <InputLabel id="pet-selector-label">ペットを選択</InputLabel>
                    <Select
                        labelId="pet-selector-label"
                        value={selectedPetId}
                        onChange={handleChange}
                        displayEmpty // プレースホルダーを表示
                    >
                        <MenuItem value="" disabled>
                            ペットを選択してください
                        </MenuItem>
                        {pets.length === 0 && !loading && !error ? (
                            <MenuItem value="" disabled>
                                登録されているペットはいません
                            </MenuItem>
                        ) : (
                            pets.map((pet) => (
                                <MenuItem key={pet.id} value={pet.id}>
                                    {pet.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
                <div style={{ marginTop: "16px" }}></div>
                <Button variant="contained" color="primary" onClick={() => setIsNew(!isNew)}>体重を記録する</Button>

            { !isNew && selectedPet  && <PetWeights petId={selectedPet.id} />}
            { isNew && selectedPet && <AddWeights petId={selectedPet.id} />}

        </Box>
    );
}
