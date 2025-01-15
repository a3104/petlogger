"use client"

import {Button, Box, Typography} from "@mui/material";
import { useState, useEffect } from "react";
// import { PetInterface } from "../models/pet";
import {Pet} from "../models/pet";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import Register from "./register";
import { petRepository } from "../repositories/petRepository";
import * as React from "react";


export default function PetList() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

    useEffect(() => {
        const fetchedPets = petRepository.getPets();
        setPets(fetchedPets);
    }, []);

    const handleEdit = (pet: Pet) => {
        setSelectedPet(pet);
    };
    const hideRegister = () => {
        setSelectedPet(null);
    }

    const updateLocalStorage = (updatedPets: Pet[]) => {
        setPets(updatedPets);
        petRepository.savePets(updatedPets);
    };

    const handleDelete = (petId: number) => {
        let updatedPets = pets.filter(pet => pet.id !== petId);
        updateLocalStorage(updatedPets);
    };

    const handleNew = () => {
        setSelectedPet(new Pet(0, "", 1, 2020, 1, 1, 0, ""));
    };
    const handleUpdate = (pet: Pet) => {
        console.log(JSON.stringify(pet));

        let updatedPets;
        if (pet.id === 0) {
            let maxId = pets.reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
            pet.id = maxId + 1;
            updatedPets = [...pets, pet];
        } else {
            updatedPets = pets.map(p => p.id === pet.id ? pet : p);
        }

        updateLocalStorage(updatedPets);
        setSelectedPet(null);
    }

    return (
            <Box sx={{maxWidth: 800, mx: "auto", p: 3}}>
                <Typography variant="h4" component="h1" gutterBottom>ペット一覧</Typography>
                <Button variant="contained" color="primary" onClick={handleNew}>新規登録</Button>
                {selectedPet && <Register isVisible={true} pet={selectedPet} handleUpdate={handleUpdate}
                                          hideRegister={hideRegister}/>}
                <TableContainer component={Paper} sx={{mt: 2}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>名前</TableCell>
                                <TableCell>種別</TableCell>
                                <TableCell>年齢</TableCell>
                                <TableCell>誕生日</TableCell>
                                <TableCell>性別</TableCell>
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pets.map((pet) => (
                                    <TableRow key={pet.id}>
                                        <TableCell>{pet.id}</TableCell>
                                        <TableCell>{pet.name}</TableCell>
                                        <TableCell>{pet.getAnimalType()}</TableCell>
                                        <TableCell>{pet.getAge()}才</TableCell>
                                        <TableCell>{pet.birthYear}年{pet.birthMonth}月{pet.birthDay}日</TableCell>
                                        <TableCell>{pet.gender === 1 ? "オス" : pet.gender === 2 ? "メス" : "登録しない"}</TableCell>
                                        {/* <TableCell>{pet.nickname}</TableCell> */}
                                        <TableCell>
                                            <Button variant="outlined" color="primary"
                                                    onClick={() => handleEdit(pet)}>編集</Button>
                                            <Button variant="outlined" color="secondary"
                                                    onClick={() => handleDelete(pet.id)}>削除</Button>
                                        </TableCell>
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
    );
}
