import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from "../fenetre-tuto/fenetre-tuto.component";
import { LocalStorageService } from '../services/local-storage.service';
import { DragAndDropItemComponent } from "./drag-and-drop-item/drag-and-drop-item.component";
import { ChangeTestComponent } from "./change-test/change-test.component";
import { NumberSelectorComponent } from './number-selector/number-selector.component';
import { SelectorOptions } from './models/selector-options';

@Component({
  selector: 'app-analyse',
  imports: [FenetreTutoComponent, DragAndDropItemComponent, ChangeTestComponent, NumberSelectorComponent],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {
  ongletCourant: string = 'analyse';
  displayModal: boolean = false;
  tutorialContent: string = 'Bienvenue sur la page analyse ...';
  @ViewChild(DragAndDropItemComponent) dnd!: DragAndDropItemComponent;
  @ViewChild(NumberSelectorComponent) numberSelector!: NumberSelectorComponent;

  etapeOptions: SelectorOptions={
    label:'Température (°c)',
    id: 'temperature',
    min: -50,
    max: 100,
    step: 1,
    placeholder: "°c"
  }



  constructor( private router: Router, private localStorage: LocalStorageService) {}

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

  testTypes = [
    {
      label:'Température (°c)',
      id: 'temperature',
      min: -50,
      max: 100,
      step: 1,
      placeholder: "°c"
    },
    {
      label:'Lumière (lux)',
      id: 'lumiere',
      min: 0,
      max: 1000,
      step: 1,
      placeholder: "lux"
    },
    {
      label:'Humidité (h)',
      id: 'humidite',
      min: 0,
      max: 100,
      step: 1,
      placeholder: "h"
    }];
  currentTestIndex = 0;
  currentTestType = this.testTypes[this.currentTestIndex]["id"];

  changeTest(){
    this.currentTestIndex = (this.currentTestIndex+1)%this.testTypes.length;
    this.currentTestType = this.testTypes[this.currentTestIndex]["id"];
    this.etapeOptions=this.testTypes[this.currentTestIndex];
    console.log(this.etapeOptions);
  }

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
