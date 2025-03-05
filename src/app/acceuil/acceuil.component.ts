import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-acceuil',
  imports: [NgStyle],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {
  // "Credits" fenetre
  displayModalCredits : boolean =false;

  constructor(private router:Router){}

  naviguerVersAnalyse(){
    this.router.navigate(['/analyse']);
  }

  openModalCredits() {
    this.displayModalCredits = true;
  }

  closeModalCredits() {
    this.displayModalCredits = false;
  }

  
}