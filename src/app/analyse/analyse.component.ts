import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from "../fenetre-tuto/fenetre-tuto.component";
import { LocalStorageService } from '../services/local-storage.service';
import { DragAndDropItemComponent } from "./drag-and-drop-item/drag-and-drop-item.component";
import { NumberSelectorComponent } from './number-selector/number-selector.component';

@Component({
  selector: 'app-analyse',
  imports: [FenetreTutoComponent, DragAndDropItemComponent, NumberSelectorComponent],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {
  ongletCourant: string = 'analyse';
  displayModal: boolean = false;
  tutorialContent: string = 'Bienvenue sur la page analyse ...';



  constructor(private router: Router, private localStorage: LocalStorageService) {}
  
  //permet de faire apparaitre qu'une seule fois la fenetre modale !!!
  ngOnInit() {
    if (!this.localStorage.estDisponible("tutorielDejaVuAnalyse")) {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuAnalyse', true);
    }
  }

  naviguerVers(page: string) {
    this.ongletCourant = page;
    this.router.navigate([`/${page}`]);
  }

}
