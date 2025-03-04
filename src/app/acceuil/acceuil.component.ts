import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  imports: [NgStyle],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {
  // "Comment jouer" fenetre
  displayModal: boolean = false;

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }
  // "Credits" fenetre
  displayModalCredits : boolean =false;

  openModalCredits() {
    this.displayModalCredits = true;
  }

  closeModalCredits() {
    this.displayModalCredits = false;
  }

  
}