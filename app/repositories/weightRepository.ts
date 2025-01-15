import WeightRecord from "../models/petWeight";

export interface WeightRepository {
    getWeights(petId: number): WeightRecord[];
    saveWeights(petId: number, weights: WeightRecord[]): void;
}

class LocalStorageWeightRepository implements WeightRepository {
    private readonly storageKey = 'petWeight';

    getWeights(petId: number): WeightRecord[] {
        const weightData = localStorage.getItem(this.storageKey);
        if (weightData) {
            const allWeightRecords: WeightRecord[] = JSON.parse(weightData);
            return allWeightRecords
                .filter(record => record.petId === petId)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        return this.getDefaultWeights();
        }

    private getDefaultWeights(): WeightRecord[] {
        return [];
    }

    saveWeights(petId: number, weights: WeightRecord[]): void {
        const weightData = localStorage.getItem(this.storageKey);
        let allWeightRecords: WeightRecord[] = [];
        if (weightData) {
            allWeightRecords = JSON.parse(weightData);
            allWeightRecords = allWeightRecords.filter(record => record.petId !== petId);
        }
        allWeightRecords.push(...weights);
        localStorage.setItem(this.storageKey, JSON.stringify(allWeightRecords));
    }
}

export const weightRepository: WeightRepository = new LocalStorageWeightRepository();
