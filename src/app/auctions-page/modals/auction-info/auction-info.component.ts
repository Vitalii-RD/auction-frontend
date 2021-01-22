import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Auction from 'src/types/Auction';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.scss']
})
export class AuctionInfoComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter();
  @Input() auction!:Auction;
  
  constructor() { }

  ngOnInit(): void {}

}
