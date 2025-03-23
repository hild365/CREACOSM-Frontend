import { NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-acceuil',
  imports: [NgStyle, FormsModule, NgIf],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {
  code: string = '';
  displayModalCredits : boolean =false;
  errorMessage: string='';

  constructor(private http: HttpClient ,private router:Router,private localStore: LocalStorageService){}

  naviguerVersAnalyse(){
    if(this.code===''){
      this.errorMessage="Vous devez saisir le code de votre groupe !"
      return
    }
    if(!this.estNumerique(this.code)){
      this.errorMessage="Le code doit être un numéro";
      return
    }
    
    // Envoi du code de la partie au back et gestion d'erreurs etc plus redirection vers la page analayse en cas de succès 
    const body={code: this.code};
     this.http.post('http://localhost:3000/start-game', body, { headers: { 'Content-Type': 'application/json' } })
       .subscribe({
         next: response => {
           console.log('Game started successfully', response);
           this.localStore.setElement('Code', this.code);

           this.router.navigate(['/analyse']);
         },
         error: error => {
           console.error('Error starting game', error);
           this.errorMessage = 'Erreur lors du démarrage de la partie. Veuillez réessayer.';
         }
       });
    this.router.navigate(['/analyse']);
  }


  openModalCredits() {
    this.displayModalCredits = true;
  }

  closeModalCredits() {
    this.displayModalCredits = false;
  }

  estNumerique(value:string){
    return /^\d+$/.test(value);
  }
  
}