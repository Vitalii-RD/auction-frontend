import { max } from "rxjs/operators";
import User from "./User";

export default class Bid {
  id: number;
  bid: number;
  maxBid:number;
  user: User;
  date: Date;
  
  constructor(id: number, bid: number, maxBid:number, user: User, date: Date) {
    this.id = id;
    this.bid = bid;
    this.maxBid = maxBid;
    this.user = user;
    this.date = date;
  }
}
