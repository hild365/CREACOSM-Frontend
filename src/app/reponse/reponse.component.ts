import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from '../fenetre-tuto/fenetre-tuto.component';
import { LocalStorageService } from '../services/local-storage.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reponse',
  imports: [FenetreTutoComponent, DragDropModule],
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss'],
})
export class ReponseComponent implements OnInit {
  ongletCourant: string = 'reponse';
  displayModal: boolean = false;
  storages: any[] = [];

  frigo: any[] = [];
  etagere: any[] = [];
  placard: any[] = [];

  tutorialContent: string =
    'Bienvenue sur la page réponse. Associez ici les ingrédients à leur stockage, grâce aux indices trouvés et notés dans le tableau.';
  donnees: any[] = [];
  donneesValidation: any;
  group: string = '';

  TIMER_CHECK_RESULT: number = 3000;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (!this.localStorage.estDisponible('tutorielDejaVuReponse')) {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuReponse', true);
    }
    if (!this.localStorage.estDisponible('codeId')) {
      this.router.navigate(['/']);
    }
    this.group = this.localStorage.getElement('codeId') as string;
    this.chargerDonnees();
  }

  chargerDonnees() {
    this.apiService.getIngredients(this.group).subscribe(
      (data: any) => {
        this.donnees = data;
        console.log('Ingredients chargées :', this.donnees);
        this.donneesValidation = new Set(data);
      },
      (error) => {
        console.error('Erreur lors du chargement des données', error);
      }
    );
    this.apiService.getStorages().subscribe(
      (data: any) => {
        this.storages = data;
        console.log('Storages chargées :', this.storages);
      },
      (error) => {
        console.error('Erreur lors du chargement des données', error);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Déplacement entre les listes
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  validerReponses() {
    const button = document.querySelector('.submit-button') as HTMLElement;
    button.classList.add('loading');

    setTimeout(() => {
      this.checkResult();
      button.classList.remove('loading');
    }, this.TIMER_CHECK_RESULT);
  }

  checkResult() {
    this.checkStorage(this.frigo, 'Frigo');
    this.checkStorage(this.etagere, 'Étagère');
    this.checkStorage(this.placard, 'Placard fermé');
    if (this.donneesValidation.size === 0) {
      alert("Bravo ! Vous avez trouvé l'emplacement de tous les ingrédients !");
    }
  }
  checkStorage(storage: any, name: string) {
    const id = this.storages.find((storage) => storage.label == name).id;
    for (let item of storage) {
      this.apiService.tryStorage(id, item.id).subscribe(
        (data: any) => {
          console.log('Resultat pour', item.label, data);
          if (data.correct) {
            item.correct = true;
            this.donneesValidation.delete(item);
          } else {
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification des données', error);
        }
      );
    }
  }

  naviguerVers(page: string) {
    this.ongletCourant = page;
    this.router.navigate([`/${page}`]);
  }
}
