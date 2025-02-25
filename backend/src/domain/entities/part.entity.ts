export class Part {
  public lastRestocked: Date;

  constructor(
    public readonly id: string,
    public name: string,
    private _stock: number, // Utilisation d'une variable privée
    public threshold: number // Seuil minimum
  ) {
    this.lastRestocked = new Date(); // Initialisation avec la date actuelle
  }

  // 🔄 Diminue le stock
  decreaseStock(quantity: number): boolean {
    if (this._stock >= quantity) {
      this._stock -= quantity;
      return true;
    }
    return false;
  }

  // ⚠️ Vérifie si le réapprovisionnement est nécessaire
  needsRestock(): boolean {
    return this._stock <= this.threshold;
  }

  // ➕ Réapprovisionne le stock et met à jour la date de réapprovisionnement
  restock(quantity: number): void {
    this._stock += quantity;
    this.lastRestocked = new Date(); // Mise à jour de la date de réapprovisionnement
  }

  // 🔍 Getter pour lire la quantité actuelle
  get quantity(): number {
    return this._stock;
  }

  // ✏️ Setter pour mettre à jour la quantité manuellement
  set quantity(newQuantity: number) {
    if (newQuantity >= 0) {
      this._stock = newQuantity;
      this.lastRestocked = new Date(); // Mise à jour de la date de réapprovisionnement
    }
  }
}
