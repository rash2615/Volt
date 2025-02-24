export class Part {
    constructor(
      public readonly id: string,
      public name: string,
      public stock: number,
      public threshold: number // Seuil minimum
    ) {}
  
    decreaseStock(quantity: number): boolean {
      if (this.stock >= quantity) {
        this.stock -= quantity;
        return true;
      }
      return false;
    }
  
    needsRestock(): boolean {
      return this.stock <= this.threshold;
    }
  }
  