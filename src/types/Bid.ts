import User from "./User";

export default class Bid {
  id: number;
  bid: number;
  user: User;
  date: Date;

  constructor(id: number, bid: number, user: User, date: Date) {
    this.id = id;
    this.bid = bid;
    this.user = user;
    this.date = date;
  }
}
