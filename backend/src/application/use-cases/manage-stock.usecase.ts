import { Part } from '../../domain/entities/part.entity';

export class ManageStockUseCase {
  private parts: Part[] = [
    new Part('1', 'Batterie', 10, 5),
    new Part('2', 'Moteur', 5, 2),
    new Part('3', 'Pneu renforcé', 20, 10),
  ];

  usePart(partId: string, quantity: number): string {
    const part = this.parts.find((p) => p.id === partId);
    if (!part) {
      return 'Pièce introuvable';
    }

    const success = part.decreaseStock(quantity);
    if (!success) {
      return 'Stock insuffisant';
    }

    if (part.needsRestock()) {
      return `⚠️ Attention, le stock de ${part.name} est faible.`;
    }

    return `${quantity} ${part.name}(s) utilisé(s) avec succès.`;
  }

  getInventory(): Part[] {
    return this.parts;
  }
}
