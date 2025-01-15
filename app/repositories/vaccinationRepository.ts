import { Vaccination } from '../models/vaccination';

const vaccinations: Vaccination[] = [];

export const addVaccination = (vaccination: Vaccination): void => {
  vaccinations.push(vaccination);
};

export const getVaccinationsByPetId = (petId: string): Vaccination[] => {
  return vaccinations.filter(v => v.petId === petId);
};

export const updateVaccination = (id: string, updatedVaccination: Vaccination): void => {
  const index = vaccinations.findIndex(v => v.id === id);
  if (index !== -1) {
    vaccinations[index] = updatedVaccination;
  }
};

export const deleteVaccination = (id: string): void => {
  const index = vaccinations.findIndex(v => v.id === id);
  if (index !== -1) {
    vaccinations.splice(index, 1);
  }
};
