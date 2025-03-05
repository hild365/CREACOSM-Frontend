import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reponse',
  imports: [],
  templateUrl: './reponse.component.html',
  styleUrl: './reponse.component.scss'
})
export class ReponseComponent {
    constructor(private router:Router){}
    
    naviguerVers(page:string){
      this.router.navigate([`/${page}`]);
    }
}
