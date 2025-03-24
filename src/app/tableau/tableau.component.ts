import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FenetreTutoComponent } from '../fenetre-tuto/fenetre-tuto.component';
import { LocalStorageService } from '../services/local-storage.service';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tableau',
  imports: [CommonModule, FenetreTutoComponent],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.scss',
})
export class TableauComponent implements OnInit {
  ongletCourant: string = 'tableau';
  displayModal: boolean = false;
  ingredientsDiscoveries: any[] = [];
  currentIngredient: any;

  //TODO Message du tutoriel à modifier
  tutorialContent: string = `Bienvenue sur la page tableau. Les résultats de vos analyses sont répertoriés ici. 
    Utilisez les boutons en haut de la page pour sélectionner un ingrédient.
    Pour chaque ingrédient, vous trouverez des notes qui vous aideront à les ranger dans la page réponse.
    Ces notes sont incomplètes, à vous de les compléter à l'aide de la page analyse !`;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const tutorielDejaVu =
      this.localStorage.getElement('tutorielDejaVuTableau') || 'false';
    if (tutorielDejaVu === 'false') {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuTableau', 'true');
    }
    const codeId: string = this.localStorage.getElement('codeId') || '';
    const savedIngredient = this.localStorage.getElement('currentIngredient');
    this.currentIngredient = savedIngredient
      ? JSON.parse(savedIngredient as string)
      : { id: -1 };

    this.apiService.getIngredients(codeId).subscribe({
      next: (ingredients: any[]) => {
        // Vérifier si la liste des ingrédients est vide
        if (!ingredients || ingredients.length === 0) {
          console.warn('No ingredients found for codeId:', codeId);
          this.ingredientsDiscoveries = []; // Éviter un traitement inutile
          return;
        }

        // Récupération des découvertes pour chaque ingrédient
        ingredients.forEach((ingredient: any) => {
          this.apiService.getDiscoveredTable(codeId, ingredient.id).subscribe({
            next: (discoveredTable: any) => {
              // Tri des découvertes par ordre alphabétique de la condition puis par ordre croissant de la lowerBound
              discoveredTable.sort((a: any, b: any) => {
                if (a.condition < b.condition) {
                  return -1;
                }
                if (a.condition > b.condition) {
                  return 1;
                }
                return a.lowerBound - b.lowerBound;
              });
              ingredient.discoveredTable = discoveredTable;
            },
            error: (error: any) => {
              console.error('Error getting discovered table', error);
            },
          });
          this.ingredientsDiscoveries.push(ingredient);
        });
      },
      error: (error: any) => {
        console.error('Error getting ingredients', error);
      },
    });
  }

  selectIngredient(ingredient: any) {
    this.localStorage.setElement(
      'currentIngredient',
      JSON.stringify(ingredient)
    );
    this.currentIngredient = ingredient;
  }

  naviguerVers(page: string) {
    this.ongletCourant = page;
    this.router.navigate([`/${page}`]);
  }
}
