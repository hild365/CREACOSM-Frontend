import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FenetreTutoComponent } from '../fenetre-tuto/fenetre-tuto.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-reponse',
  imports: [FenetreTutoComponent],
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent implements OnInit {
  ongletCourant: string = 'reponse';
  displayModal: boolean = false;
  //TODO contenu à modifier
  tutorialContent: string = 'Bienvenue sur la page réponse....';

  constructor(private router: Router, private localStorage: LocalStorageService) {}

  ngOnInit() {
    if (!this.localStorage.estDisponible("tutorielDejaVuReponse")) {
      this.displayModal = true;
      this.localStorage.setElement('tutorielDejaVuReponse', true);
    }
  }
 


  naviguerVers(page: string) {
    this.ongletCourant = page;
    this.router.navigate([`/${page}`]);
  }
}
