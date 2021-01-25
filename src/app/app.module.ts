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
import { ResponseComponent } from './auctions-page/modals/response/response.component';

@NgModule({
  declarations: [
    AppComponent,
    AuctionsPageComponent,
    AuctionCardComponent,
    CreateAuctionComponent,
    MakeBidComponent,
    AuctionInfoComponent,
    ResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
