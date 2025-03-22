import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from '../fenetre-tuto/fenetre-tuto.component';
import { LocalStorageService } from '../services/local-storage.service';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-reponse',
  imports: [FenetreTutoComponent, DragDropModule],
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent implements OnInit {
  ongletCourant: string = 'reponse';
  displayModal: boolean = false;
  items=["Beurre de karité", "Aloe Vera", "Extrait de fleurs", "Acide Citrique", "Parfum"]
  frigo: string[]=[]
  armoireVentilee: string[]=[]
  armoireVitree: string[]=[]
  tutorialContent: string = 'Bienvenue sur la page réponse....';

  constructor(private router: Router, private localStorage: LocalStorageService) {}

  ngOnInit() {
    if (!this.localStorage.estDisponible("tutorielDejaVuReponse")) {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuReponse', true);
    }
  }

  drop(event: CdkDragDrop<string[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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

  naviguerVers(page: string) {
    this.ongletCourant = page;
    this.router.navigate([`/${page}`]);
  }
}
