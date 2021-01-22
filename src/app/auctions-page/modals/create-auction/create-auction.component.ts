import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter()
  @Output() submitCreateAuctionEvent = new EventEmitter();
  
  defaultAuctionForm = {
    title: '',
    initialBid: 0
  }

  auctionForm =  this.formBuilder.group(this.defaultAuctionForm);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {}

  onSubmitCreateAuction() {
    this.submitCreateAuctionEvent.emit(this.auctionForm.value);
    this.auctionForm.reset(this.defaultAuctionForm);
  }

  
}
