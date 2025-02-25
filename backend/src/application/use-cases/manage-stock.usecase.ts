import { Part } from '../../domain/entities/part.entity';

export class ManageStockUseCase {
  private parts: Part[] = [
    new Part('1', 'Batterie', 10, 5),
    new Part('2', 'Moteur', 5, 2),
    new Part('3', 'Pneu renforcé', 20, 10),
  ];

  // ➕ Ajouter un nouvel article
  addStock(name: string, quantity: number, lastRestocked: Date): Part {
    const newPart = new Part((this.parts.length + 1).toString(), name, quantity, 0);
    newPart.lastRestocked = lastRestocked;
    this.parts.push(newPart);
    return newPart;
  }

  // 🔄 Mettre à jour un article existant
  updateStock(id: string, name: string, quantity: number, lastRestocked: Date): Part | null {
    const part = this.parts.find((p) => p.id === id);
    if (!part) {
      return null;
    }

    part.name = name;
    part.quantity = quantity;
    part.lastRestocked = lastRestocked;
    return part;
  }

  // 🗑️ Supprimer un article du stock
  deleteStock(id: string): boolean {
    const index = this.parts.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    this.parts.splice(index, 1);
    return true;
  }

  // 🛠️ Utiliser une pièce spécifique
  usePart(partId: string, quantity: number): string {
    const part = this.parts.find((p) => p.id === partId);
    if (!part) {
      return '❌ Pièce introuvable.';
    }

    const success = part.decreaseStock(quantity);
    if (!success) {
      return '❌ Stock insuffisant.';
    }

    if (part.needsRestock()) {
      return `⚠️ Attention, le stock de ${part.name} est faible.`;
    }

    return `✅ ${quantity} ${part.name}(s) utilisé(s) avec succès.`;
  }

  // 🔍 Obtenir l'inventaire complet
  getInventory(): Part[] {
    return this.parts;
  }
}
