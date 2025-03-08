import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Permet l'injection automatique dans toute l'application
})
export class LocalStorageService {

  private stockage: { [cle: string]: any } = {};

  constructor() {}

  // Sauvegarde une valeur dans le stockage
  setElement(cle: string, valeur: any): void {
    this.stockage[cle] = valeur;
  }

  // Récupère une valeur du stockage
  getElement<T>(cle: string): T | null {
    return this.stockage[cle] !== undefined ? this.stockage[cle] as T : null;
  }

  // Supprime une clé du stockage
  supprimerElement(cle: string): void {
    delete this.stockage[cle];
  }

  // Demande si une clé est Disponible
  estDisponible(cle: string): boolean {
    return this.stockage[cle] !== undefined;
  }

  // Efface complètement le stockage
  effacer(): void {
    this.stockage = {};
  }
}
