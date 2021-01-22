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
        this.auctions = data
        console.log(data);
      },
      (e:HttpErrorResponse) => {
        this.auctions = [];
        this.error = "Oops, something went wrong. Can not load the tasks.";
      } 
    );
  }

  createAuction(formData:any):void {
    this.auctionService.createAuction(formData, 2)
    .subscribe(
      (data:Auction) => this.auctions.push(data),
      (e:HttpErrorResponse) => {
        console.log(e);
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
    this.createAuction(data);
    this.closeModal();
  }

  onSubmitMakeBid(data:any):void {
    this.makeBid(data);
    this.closeModal();
  }


  makeBid(data:any):void {
    this.auctionService.makeBid(this.selectedAuction.id, 4, data)
    .subscribe(
      (data:Auction) => this.auctions = this.auctions.map((e:Auction) => e.id == data.id ? data : e),
      (e:HttpErrorResponse) => {
        console.log(e);
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
    this.auctionService.closeAuction(this.selectedAuction.id, 1)
    .subscribe(
      (data:Auction) => this.auctions = this.auctions.map((e:Auction) => e.id == data.id ? data : e),
      (e:HttpErrorResponse) => {
        console.log(e);
      }
    ) 
  }

  openModal(type:string):void {
    console.log(type);
    this.modalType = type;
    this.isModal = true;
  }

  closeModal():void {
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
