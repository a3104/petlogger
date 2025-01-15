"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Pet } from "../models/pet";
import { Box, Typography, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { petRepository } from "../repositories/petRepository";
import { weightRepository } from "../repositories/weightRepository";
import WeightRecord from "../models/petWeight";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PetWeights({ petId }: { petId: number }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [weights, setWeights] = useState<WeightRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPets = petRepository.getPets();
        const selectedPet = fetchedPets.find((pet) => pet.id === Number(petId));
        if (selectedPet) {
          const fetchedWeights = weightRepository.getWeights(selectedPet.id);
          setPet(selectedPet);
          setWeights(fetchedWeights);
          if (fetchedWeights.length === 0) {
            setError("体重が記録されていません。");
          }
        } else {
          setError("ペットが見つかりません。");
        }
      } catch (e: any) {
        console.error("Error fetching pet from repository:", e);
        setError("ペットの読み込みに失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const weightData = weights.map(weight => ({
    x: weight.date,
    y: weight.weight
  })) || [];

  const data = {
    labels: weightData.map(data => data.x),
    datasets: [
      {
        label: `${pet?.name}の体重`,
        data: weightData.map(data => data.y),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {pet ? (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {pet.name}の体重
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Line data={data} />
          </Paper>
          体重データ
          <Paper elevation={3} sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>日付</TableCell>
                    <TableCell>体重 (kg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weights.map((weight) => (
                    <TableRow key={weight.date}>
                      <TableCell>{weight.date}</TableCell>
                      <TableCell>{weight.weight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
        <Typography>ペットが見つかりません。</Typography>
      )}
    </Box>
  );
}
