import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';



@Component({
  selector: 'app-victoire',
  imports: [],
  templateUrl: './victoire.component.html',
  styleUrl: './victoire.component.scss'
})
export class VictoireComponent {
constructor(
    private apiService: ApiService, private localStorage: LocalStorageService
  ) {}

  endGame(){
    this.apiService.endGame(this.localStorage.getElement('codeId') as string).subscribe({
      next: (data: any) => {
      },
      error: (error: any) => {
        console.error('Error while ending the game:', error);
      }
    });
  }
}
