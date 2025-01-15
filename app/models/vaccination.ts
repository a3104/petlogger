export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  date: string;
  veterinarian: string;
  notes?: string;
}
