import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionsPageComponent } from './auctions-page/auctions-page.component';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';


const routes: Routes = [
  { path: 'auctions', component: AuctionsPageComponent },
  { path: 'login', component: AuthenticationPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
