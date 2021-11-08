import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { RegisterComponent } from './register/register.component';
import { ShowEntryComponent } from './show-entry/show-entry.component';

const routes: Routes = [
  {
    path : "landing-page",
    component : LandingPageComponent
  },
  {
    path : "entry-list",
    component : EntriesListComponent
  },
  {
    path : "new-entry",
    component : NewEntryComponent
  },
  {
    path : "about",
    component : AboutComponent
  },
  {
    path : "show-entry/:id",
    component : ShowEntryComponent
  },
  {
    path : "",
    component : LoginComponent
  },
  {
    path : "register",
    component : RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
