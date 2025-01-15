"use client";
import React, { useState, useEffect } from 'react';
import { Vaccination } from '../models/vaccination';
import { addVaccination, getVaccinationsByPetId } from '../repositories/vaccinationRepository';

const AddVaccination: React.FC = () => {
  const [petId, setPetId] = useState<string>(''); // ペットIDの状態を追加
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]); // ワクチン接種記録の状態を追加
  const [vaccination, setVaccination] = useState<Vaccination>({
    id: '',
    petId: '',
    vaccineName: '',
    date: '',
    veterinarian: '',
    notes: '',
  });

  useEffect(() => {
    if (petId) {
      setVaccinations(getVaccinationsByPetId(petId));
    }
  }, [petId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVaccination({ ...vaccination, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVaccination({ ...vaccination, petId });
    setVaccinations(getVaccinationsByPetId(petId));
    setVaccination({
      id: '',
      petId: '',
      vaccineName: '',
      date: '',
      veterinarian: '',
      notes: '',
    });
  };

  return (
    <div>
      <h2>Add Vaccination</h2>
      <input type="text" value={petId} onChange={(e) => setPetId(e.target.value)} placeholder="Pet ID" required />
      <form onSubmit={handleSubmit}>
        <input type="text" name="vaccineName" value={vaccination.vaccineName} onChange={handleChange} placeholder="Vaccine Name" required />
        <input type="date" name="date" value={vaccination.date} onChange={handleChange} required />
        <input type="text" name="veterinarian" value={vaccination.veterinarian} onChange={handleChange} placeholder="Veterinarian" required />
        <input type="text" name="notes" value={vaccination.notes} onChange={handleChange} placeholder="Notes" />
        <button type="submit">Add Vaccination</button>
      </form>
      <h3>Vaccination Records</h3>
      <ul>
        {vaccinations.map(v => (
          <li key={v.id}>
            {v.vaccineName} - {v.date} - {v.veterinarian} - {v.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddVaccination;
