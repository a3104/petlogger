

export class Pet {
    id: number;
    name: string;
    type: number;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    gender: number;
    nickname: string;
    petImageUrl?: string | undefined;
    targetWeight: number | undefined;

    constructor(id: number = 0, name: string = "", type: number = 1, birthYear: number = 2020, birthMonth: number = 1, birthDay: number = 1, gender: number = 0, nickname: string = "", petImageUrl: string = "", targetWeight: number = 0.0) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.gender = gender;
        this.nickname = nickname;
        this.petImageUrl = petImageUrl;
        this.targetWeight = targetWeight;
    }

    getAge(): number {
        const now = new Date();
        const birth = new Date(this.birthYear, this.birthMonth - 1, this.birthDay);
        const diff = now.getTime() - birth.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    getAnimalType(): string {
        const animalTypes: { [key: number]: string } = {
            1: "猫",
            2: "犬",
            3: "その他"
        };
        return animalTypes[this.type] || "不明";
    }
}
