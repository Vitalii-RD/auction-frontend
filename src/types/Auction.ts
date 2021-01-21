import Bid from "./Bid";
import Item from "./Item";

export default class Auction {
  id: number;
  item: Item;
  initialBid: number;
  dateCreated: Date;
  done: boolean;
  history: Bid[];

  constructor(id: number, item: Item, initialBid: number, dateCreated: Date, done: boolean, history: Bid[]) {
    this.id = id;
    this.item = item;
    this.initialBid = initialBid;
    this.dateCreated =dateCreated;
    this.done = done;
    this.history = history;
  }
}