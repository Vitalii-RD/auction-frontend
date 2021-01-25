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
  response: string = '';
  error: string = '';
  modalType!:string;
  selectedAuction!:Auction;
  
  constructor(private auctionService: AuctionService) {
    this.auctions = [];
    this.modalType = 'makeBid';
  }

  ngOnInit(): void {
    this.getAuctions();
  }

  getAuctions():void {
    this.auctionService.getAuctions()
    .subscribe(
      (data:Auction[]) => {
        this.auctions = data;
        console.log(data);
      },
      (e:HttpErrorResponse) => {
        this.openModal('response');
        this.auctions = [];
        this.error = "Oops, something went wrong. Can not load auctions.";
      } 
    );
  }

  createAuction(formData:any):void {
    this.openModal('response');
    this.auctionService.createAuction(formData, 2)
    .subscribe(
      (data:Auction) => {
        this.auctions.push(data);
        this.response = 'Successfully added'
      },
      (e:HttpErrorResponse) => {
        this.error = 'Could not add. Try again'
      });
  }

  onMakeBidClick(auction:Auction):void {
    this.selectedAuction = auction;
    this.openModal('makeBid');
  }

  onShowInfo(auction:Auction) {
    this.selectedAuction = auction;
    this.openModal('showInfo');
  }

  onSubmitCreateAuction(data:any):void {
    this.closeModal();
    this.createAuction(data);
  }

  onSubmitMakeBid(data:any):void {
    this.closeModal();
    this.makeBid(data);
  }


  makeBid(data:any):void {
    this.openModal('response');
    this.auctionService.makeBid(this.selectedAuction.id, 4, data)
    .subscribe(
      (data:Auction) => {
        this.auctions = this.auctions.map((e:Auction) => e.id == data.id ? data : e)
        this.response = 'You have made a bid';
      }, 
      (e:HttpErrorResponse) => {
        console.log(e);
        this.error = 'Something went wrong and server could not take your bid'
        this.getAuctionById(this.selectedAuction.id);
      }
    );
  }

  getAuctionById(id:number):void {
    this.auctionService.getAuctionById(id)
    .subscribe(
      (data:Auction) => this.auctions = this.auctions.map((e:Auction) => e.id == data.id ? data : e),
      (e:HttpErrorResponse) => {
        console.log(e);
      }
    )
  }

  onCloseAuction(auction:Auction):void {
    this.selectedAuction = auction;
    this.closeAuction();
  }

  closeAuction() {
    this.openModal('response');
    this.auctionService.closeAuction(this.selectedAuction.id, 1)
    .subscribe(
      (data:Auction) => {
        this.auctions = this.auctions.map((e:Auction) => e.id == data.id ? data : e);
        this.response = 'The auction is closed';
      },
      (e:HttpErrorResponse) => {
        console.log(e);
        this.error = 'The server could not close the auction';
      }
    ) 
  }

  openModal(type:string):void {
    console.log(type);
    this.modalType = type;
    this.isModal = true;
  }

  closeModal():void {
    this.response = '';
    this.error = '';
    this.isModal = false;
  }

  getMinBidValue():number {
    const INCREASE_RATE = 1.05;

    let res = this.selectedAuction.history.length
      ? Math.round(this.selectedAuction.history[this.selectedAuction.history.length-1].bid * INCREASE_RATE) 
      : 0;

    let len = res.toString().length;
    if (1 < len && len <= 3 ) res = Math.ceil(res / 10) * 10;
    else if (len > 3) res = Math.ceil(res / 100) * 100;

    return res;
  }
}
