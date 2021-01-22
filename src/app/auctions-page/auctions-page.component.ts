import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Auction from 'src/types/Auction';
import { AuctionService } from './auction-page.service';

@Component({
  selector: 'app-auctions-page',
  templateUrl: './auctions-page.component.html',
  styleUrls: ['./auctions-page.component.scss']
})
export class AuctionsPageComponent implements OnInit {
  auctions: Auction[];
  isModal: boolean = false;
  error: String = '';
  
  defaultForm = {
    title: '',
    initialBid: 0
  }
  
  auctionForm =  this.formBuilder.group(this.defaultForm);

  constructor(
    private auctionService: AuctionService,
    private formBuilder: FormBuilder
    ) {
    this.auctions = []
  }

  ngOnInit(): void {
    this.getAuctions();
  }

  getAuctions():void {
    this.auctionService.getAuctions()
    .subscribe(
      (data:Auction[]) => {
        this.auctions = data
        console.log(data);
      },
      (e:HttpErrorResponse) => {
        this.auctions = [];
        this.error = "Oops, something went wrong. Can not load the tasks.";
      } 
    );
  }

  closeModal():void {
    this.isModal = false;
  }

  openModal():void {
    this.isModal = true;
  }

  createAuction(formData:any):void {
    this.auctionService.createAuction(formData, 2)
    .subscribe(
      (data:Auction) => this.auctions.push(data),
      (e:HttpErrorResponse) => {
        console.log(e);
      });
  }

  onSubmit():void {
    this.createAuction(this.auctionForm.value);
    this.closeModal();
    this.auctionForm.reset(this.defaultForm);
  }

  makeBid(auction:Auction) {

  }

}
