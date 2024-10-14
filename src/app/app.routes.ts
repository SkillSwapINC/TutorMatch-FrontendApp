import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {DashboardComponent} from "./tutoring/components/dashboard/dashboard.component";
import {RegisterComponent} from "./tutoring/pages/register/register.component";
import {LoginComponent} from "./tutoring/pages/login/login.component";
import {PlansComponent} from "./tutoring/components/plans/plans.component";


export const routes: Routes = [
  {path:'Dashboard',                component:DashboardComponent},
  {path:'LogIn',                  component:LoginComponent},
  {path:'Register',                 component:RegisterComponent},
  {path:'Plans',                 component:PlansComponent},
  { path: '',                       redirectTo: 'Dashboard', pathMatch: 'full' },
  { path: '**',                     component: PageNotFoundComponent }

];
