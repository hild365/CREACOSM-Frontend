import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { TableauComponent } from './tableau/tableau.component';
import { ReponseComponent } from './reponse/reponse.component';
import { VictoireComponent } from './victoire/victoire.component';

export const routes: Routes = [
    {path:'', component:AcceuilComponent},
    {path:'analyse', component:AnalyseComponent},
    {path:'tableau',component:TableauComponent},
    {path:'reponse',component:ReponseComponent},
    {path: 'victoire', component:VictoireComponent}
];
