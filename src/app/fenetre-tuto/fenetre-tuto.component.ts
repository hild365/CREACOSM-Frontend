import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fenetre-tuto',
  imports: [NgStyle],
  templateUrl: './fenetre-tuto.component.html',
  styleUrl: './fenetre-tuto.component.scss'
})
export class FenetreTutoComponent {
  @Input() display: boolean = false;
  @Input() tutorialContent: string = '';

  closeModal() {
    this.display = false;
  }
}
