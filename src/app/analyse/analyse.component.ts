import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from "../fenetre-tuto/fenetre-tuto.component";
import { LocalStorageService } from '../services/local-storage.service';
import { DragAndDropItemComponent } from "./drag-and-drop-item/drag-and-drop-item.component";
import { ChangeTestComponent } from "./change-test/change-test.component";
import { NumberSelectorComponent } from './number-selector/number-selector.component';
import { SelectorOptions } from './models/selector-options';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analyse',
  imports: [ FenetreTutoComponent, DragAndDropItemComponent, ChangeTestComponent, NumberSelectorComponent],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {
  donnees: any[] = [];
  ongletCourant: string = 'analyse';
  displayModal: boolean = false;
  tutorialContent: string = 'Bienvenue sur la page analyse ...';
  erreur: string = "";
  @ViewChild(DragAndDropItemComponent) dnd_comp!: DragAndDropItemComponent; //pour pouvoir remplir la liste d'item et l'objet mis en test
  @ViewChild(NumberSelectorComponent) numberSelector_comp!: NumberSelectorComponent; //pour connaitre l'unité et le test en cours donné

  lesTypesDeTest = [
    {
      label:'Température (°c)',
      id: 'temperature',
      min: -50,
      max: 100,
      step: 1,
      placeholder: "°c"
    },
    {
      label:'Lumière (lx)',
      id: 'lumiere',
      min: 0,
      max: 1000,
      step: 1,
      placeholder: "lx"
    },
    {
      label:'Humidité (%HR)',
      id: 'humidite',
      min: 0,
      max: 100,
      step: 1,
      placeholder: "%HR"
    }];

  paramEtape: SelectorOptions=this.lesTypesDeTest[0]
  currentTestIndex = 0;
  currentTestType = this.lesTypesDeTest[this.currentTestIndex]["id"];

  constructor( private router: Router, private localStorage: LocalStorageService, private apiService: ApiService) {}

  //permet de faire apparaitre qu'une seule fois la fenetre modale !!!
  ngOnInit() {
    if (!this.localStorage.estDisponible("tutorielDejaVuAnalyse")) {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuAnalyse', true);
    }
    this.chargerDonnees();
  }
  chargerDonnees() {
    this.apiService.get('/get-ingredients').subscribe(
      (data: any) => {
        this.donnees = data;
        console.log('Données chargées :', this.donnees);
      },
      (error) => {
        console.error('Erreur lors du chargement des données', error);
      }
    );
    // Vous pouvez ensuite exécuter des opérations ligne par ligne dans this.donnees
  }

  naviguerVers(page: string) {
    this.ongletCourant = page;
    this.router.navigate([`/${page}`]);
  }

  changeTest(){
    this.currentTestIndex = (this.currentTestIndex+1)%this.lesTypesDeTest.length;
    this.currentTestType = this.lesTypesDeTest[this.currentTestIndex]["id"];
    this.paramEtape=this.lesTypesDeTest[this.currentTestIndex];
    this.erreur=""
  }

  simulate(){
    const valueTest =this.numberSelector_comp.getValue();
    const itemList=this.dnd_comp.getTestList()
    if (itemList.length === 0) {
      this.erreur="Veuillez ajouter des éléments à analyser";
      return;
    }
    if (valueTest === null || Number.isNaN(valueTest)) {
      this.erreur="Veuillez renseigner la valeur du test"
      return;
    }
    this.erreur=`Simulation du test ${this.currentTestType} avec la valeur ${valueTest} et les éléments ${itemList}`;
  }
}
