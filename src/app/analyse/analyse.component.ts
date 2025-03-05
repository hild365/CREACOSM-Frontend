import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-analyse',
  imports: [],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.scss'
})
export class AnalyseComponent {
  constructor(private router:Router){}
  
  naviguerVers(page:string){
    this.router.navigate([`/${page}`]);
  }

}
