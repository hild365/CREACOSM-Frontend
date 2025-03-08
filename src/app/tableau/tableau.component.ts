import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from "../fenetre-tuto/fenetre-tuto.component";
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tableau',
  imports: [FenetreTutoComponent],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.scss'
})
export class TableauComponent {
    ongletCourant:string = 'tableau';
    displayModal:boolean = false;

    //TODO Message du tutoriel à modifier
    tutorialContent:string = 'Bienvenue sur la page tableau ...';
      
    constructor(private router: Router, private localStorage: LocalStorageService) {}
    
    ngOnInit() {
      if (!this.localStorage.estDisponible("tutorielDejaVuTableau")) {
        this.displayModal = true;
        this.localStorage.setElement('tutorielDejaVuTableau', true);
      }
    }
    
    naviguerVers(page:string){
      this.ongletCourant=page;
      this.router.navigate([`/${page}`]);
    }
}
