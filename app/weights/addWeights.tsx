"use client";

import React, { useState, useEffect, useRef } from "react";
import { Pet } from "../models/pet";
import { TextField, Button, Box, Typography } from "@mui/material";
import { weightRepository } from "../repositories/weightRepository";

interface AddWeightsProps {
  petId: number;
}

interface WeightRecord {
  petId: number;
  date: string;
  weight: number;
}

export default function AddWeights({ petId }: { petId: number }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [weight, setWeight] = useState<number | "">("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const weightInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const localstorageData = localStorage.getItem("pets");
    if (localstorageData) {
      const pets = JSON.parse(localstorageData) as any[];
      const selectedPet = pets.find((pet: any) => pet.id === petId);
      if (selectedPet) {
        setPet(Object.assign(new Pet(), selectedPet));
      }
    }
  }, [petId]);

  useEffect(() => {
    if (weightInputRef.current) {
      weightInputRef.current.focus();
    }
  }, []);

  const handleAddWeight = () => {
    if (weight && date) {
      const newRecord: WeightRecord = { petId, date, weight: Number(weight) };
      const updatedRecords = weightRecords.map(record => 
        record.date === date ? newRecord : record
      );
      // 日付が同じ場合は上書き、そうでない場合は追加
      if (!updatedRecords.some(record => record.date === date)) {
        updatedRecords.push(newRecord);
      }
      setWeightRecords(updatedRecords);
      weightRepository.saveWeights(petId, updatedRecords);
      setWeight("");
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  useEffect(() => {
    const petWeightRecords = weightRepository.getWeights(petId);
    setWeightRecords(petWeightRecords);
  }, [petId]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      {pet && (
        <>
          <Typography variant="h5" component="h2" gutterBottom>
            {pet.name}の体重記録
          </Typography>
          <TextField
            label="日付"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="体重 (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
            fullWidth
            margin="normal"
            inputRef={weightInputRef}
          />
          <Button variant="contained" color="primary" onClick={handleAddWeight}>
            追加
          </Button>
          <Box mt={2}>
            <Typography variant="h6" component="h3">
              記録一覧
            </Typography>
            {weightRecords.map((record, index) => (
              <Box key={index} display="flex" justifyContent="space-between" mt={1}>
                <Typography>{record.date}</Typography>
                <Typography>{record.weight} kg</Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
