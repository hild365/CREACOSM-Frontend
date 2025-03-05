import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableau',
  imports: [],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.scss'
})
export class TableauComponent {
    constructor(private router:Router){}
    
    naviguerVers(page:string){
      this.router.navigate([`/${page}`]);
    }
}
