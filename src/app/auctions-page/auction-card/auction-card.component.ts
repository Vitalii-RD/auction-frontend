import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import Auction from 'src/types/Auction';
import User from 'src/types/User';

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent implements OnInit {
  @Input() auction!:Auction;
  @Input() user!:User;
  @Output() makeBidClick = new EventEmitter<Auction>();
  @Output() closeAuction = new EventEmitter<Auction>();
  @Output() showInfo = new EventEmitter<Auction>()
  
  constructor() { }

  ngOnInit(): void {
  }
}
