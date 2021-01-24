import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionsPageComponent } from './auctions-page/auctions-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuctionCardComponent } from './auctions-page/auction-card/auction-card.component';
import { CreateAuctionComponent } from './auctions-page/modals/create-auction/create-auction.component';
import { MakeBidComponent } from './auctions-page/modals/make-bid/make-bid.component';
import { AuctionInfoComponent } from './auctions-page/modals/auction-info/auction-info.component';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AuctionsPageComponent,
    AuctionCardComponent,
    CreateAuctionComponent,
    MakeBidComponent,
    AuctionInfoComponent,
    AuthenticationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
