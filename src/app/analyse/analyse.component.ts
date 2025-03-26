import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from '../fenetre-tuto/fenetre-tuto.component';
import { LocalStorageService } from '../services/local-storage.service';
import { DragAndDropItemComponent } from './drag-and-drop-item/drag-and-drop-item.component';
import { ChangeTestComponent } from './change-test/change-test.component';
import { NumberSelectorComponent } from './number-selector/number-selector.component';
import { SelectorOptions } from './models/selector-options';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analyse',
  imports: [
    FenetreTutoComponent,
    DragAndDropItemComponent,
    ChangeTestComponent,
    NumberSelectorComponent,
  ],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss'],
})
export class AnalyseComponent implements OnInit {

  tutorialContent: string = "Bienvenue dans votre laboratoire. Vous pouvez ici simuler des tests sur des ingrédients pour obtenir leur état de conservation. Pour commencer, sélectionnez un type de test et une valeur, puis ajoutez l'ingrédient à analyser. Votre matériel vous permet de réaliser des expérimentations sur la température, la luminosité et le niveau d'humidité. Inutile de retenir les résultats : ceux-ci sont automatiquement enregistrés dans votre tableau.";

  donnees: any[] = [];
  ongletCourant: string = 'analyse';
  displayModal: boolean = false;
  erreur: string = "";
  group: string ="";
  resultatTest: any []=[];
  paramEtape: SelectorOptions = {label:'', id:'', min:0, max:0, step:0, placeholder:''};
  currentTestIndex: number = 0;
  currentTestType: string = "";
  @ViewChild(DragAndDropItemComponent) dnd_comp!: DragAndDropItemComponent; //pour pouvoir remplir la liste d'item et l'objet mis en test
  @ViewChild(NumberSelectorComponent)
  numberSelector_comp!: NumberSelectorComponent; //pour connaitre l'unité et le test en cours donné

  lesTypesDeTest = [
    {
      label: 'Température (°c)',
      id: 'température',
      min: -50,
      max: 100,
      step: 1,
      placeholder: '°c',
    },
    {
      label: 'Luminosité (lx)',
      id: 'luminosité',
      min: 0,
      max: 1000,
      step: 1,
      placeholder: 'lx',
    },
    {
      label: 'Humidité (%HR)',
      id: 'humidité',
      min: 0,
      max: 100,
      step: 1,
      placeholder: '%HR',
    },
  ];

  

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private apiService: ApiService
  ) {}

  //permet de faire apparaitre qu'une seule fois la fenetre modale !!!
  ngOnInit() {
    if(!this.localStorage.estDisponible("currentTestType")){
      this.paramEtape=this.lesTypesDeTest[0]
      this.currentTestIndex = 0;
      this.currentTestType = this.lesTypesDeTest[this.currentTestIndex]["id"];
      this.localStorage.setElement("currentTestType", this.currentTestType);
      this.localStorage.setElement("paramEtape", this.paramEtape);
      this.localStorage.setElement("currentTestIndex", this.currentTestIndex);
    } else {
      this.paramEtape = this.localStorage.getElement("paramEtape") as SelectorOptions;
      this.currentTestIndex = this.localStorage.getElement("currentTestIndex") as number;
      this.currentTestType = this.localStorage.getElement("currentTestType") as string;
    }
    if (!this.localStorage.estDisponible("tutorielDejaVuAnalyse")) {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuAnalyse', true);
    }
    if (!this.localStorage.estDisponible('codeId')) {
      this.router.navigate(['/']);
      return;
    }
    this.group = this.localStorage.getElement('codeId') as string;
    this.chargerDonnees();
  }
  chargerDonnees() {
    this.apiService.getIngredients(this.group).subscribe(
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
    this.resultatTest=[]
    this.localStorage.setElement("currentTestType", this.currentTestType);
    this.localStorage.setElement("paramEtape", this.paramEtape);
    this.localStorage.setElement("currentTestIndex", this.currentTestIndex);
  }

  simulate() {
    this.erreur = '';
    const valueTest = this.numberSelector_comp.getValue();
    const itemList = this.dnd_comp.getTestList();
    if (itemList.length === 0) {
      this.resultatTest = [];
      this.erreur = 'Veuillez ajouter des éléments à analyser';
      return;
    }
    if (valueTest === null || Number.isNaN(valueTest)) {
      this.resultatTest = [];
      this.erreur = 'Veuillez renseigner la valeur du test';
      return;
    }
    //simulation du test
    this.apiService
      .analyzeIngredient(
        this.group,
        itemList[0].id,
        this.currentTestType,
        valueTest
      )
      .subscribe(
        (data: any) => {
          this.resultatTest = data.text;
          console.log('Résultat du test:', this.resultatTest);
        },
        (error) => {
          console.error(
            'Erreur lors de la simulation du test veuillez réessayer',
            error
          );
        }
      );
  }
}
