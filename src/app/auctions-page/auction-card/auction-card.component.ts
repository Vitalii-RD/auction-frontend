import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import Auction from 'src/types/Auction';

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent implements OnInit {
  @Input() auction!:Auction;
  @Output() makeBidClick = new EventEmitter<Auction>();

  constructor() { }

  ngOnInit(): void {
  }

  makeBid() {
    this.makeBidClick.emit(this.auction);
  }
}