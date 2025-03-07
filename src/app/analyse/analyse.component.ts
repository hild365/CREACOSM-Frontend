import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analyse',
  imports: [],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.scss'
})
export class AnalyseComponent {
  ongletCourant:string='analyse';
  constructor(private router:Router){}
  
  naviguerVers(page:string){
    this.ongletCourant=page;
    this.router.navigate([`/${page}`]);
  }

}
