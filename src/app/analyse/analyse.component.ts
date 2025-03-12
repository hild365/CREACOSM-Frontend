import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from "../fenetre-tuto/fenetre-tuto.component";
import { LocalStorageService } from '../services/local-storage.service';
import { DragAndDropItemComponent } from "./drag-and-drop-item/drag-and-drop-item.component";
import { NumberSelectorComponent } from './number-selector/number-selector.component';
import { SelectorOptions } from './models/selector-options';

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
  @ViewChild(DragAndDropItemComponent) dnd!: DragAndDropItemComponent;
  @ViewChild(NumberSelectorComponent) numberSelector!: NumberSelectorComponent;


  //cela sera rempli dynamiquement au fur et a mesure de la completion de chaque étapes (temperature, lumiere, ph)
  etapeOptions: SelectorOptions={
    label:'Température (°c)',
    id: 'temperature',
    min: -50,
    max: 100,
    step: 1,
    placeholder: "°c"
  }



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

  testTypes = ['temperature', 'lumiere', 'pH'];
  currentTestIndex = 0;
  currentTestType = this.testTypes[this.currentTestIndex];

  simulate(){
    const valueTest =this.numberSelector.getValue();
    const itemList=this.dnd.getList()
    if (itemList.length === 0) {
      console.log('Veuillez ajouter des éléments à analyser');
      return;
    }
    if (valueTest === null || Number.isNaN(valueTest)) {
      console.log('Veuillez renseigner la valeur du test');
      return;
    }
    console.log(`Simulation du test ${this.currentTestType} avec la valeur ${valueTest} et les éléments ${itemList}`);
  }
}
