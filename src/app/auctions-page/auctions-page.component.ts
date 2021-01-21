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
    initialBid: ''
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

  getAuctions() {
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

  closeModal() {
    this.isModal = false;
  }

  openModal() {
    this.isModal = true;
  }

  onSubmit() {
    this.closeModal();
    this.auctionForm.reset(this.defaultForm);
  }

}
