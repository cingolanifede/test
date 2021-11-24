export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, quality: number, sellIn: number) {
        this.name = name;
        this.quality = quality;
        this.sellIn = sellIn;
    }
}