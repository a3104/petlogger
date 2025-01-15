import { Pet } from "../models/pet";

export interface PetRepository {
    getPets(): Pet[];
    savePets(pets: Pet[]): void;
}

class LocalStoragePetRepository implements PetRepository {
    getPets(): Pet[] {
        const localstorage = localStorage.getItem("pets");
        if (localstorage) {
            const pets = JSON.parse(localstorage);
            return pets.map((pet: any) => Object.assign(new Pet(), pet));
        }
        return this.getDefaultPets();
    }

    private getDefaultPets(): Pet[] {
        return [
            new Pet(1, "Tama", 1, 2020, 5, 20, 1, "タマ"),
            // 他のペットデータ
        ];
    }
    savePets(pets: Pet[]): void {
        localStorage.setItem("pets", JSON.stringify(pets));
    }
}

export const petRepository: PetRepository = new LocalStoragePetRepository();
