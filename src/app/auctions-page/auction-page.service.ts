
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import Auction from 'src/types/Auction';

class BidRequest {
  bid: number;
  maxBid:number

  constructor(bid: number, maxBid: number) {
    this.bid = bid;
    this.maxBid = maxBid;
  }
}

class AuctionRequest {
  itemName:string;
  initialBid:number;
  done:boolean;

  constructor(itemName:string, initialBid:number, done:boolean) {
    this.itemName = itemName;
    this.initialBid = initialBid;
    this.done = done;
  }
}

@Injectable({ providedIn: 'root' })
export class AuctionService {
  
  private auctionsUlr = environment.url + '/auctions';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  getAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionsUlr)
    .pipe(
      retry(1)
    )
  }

  createAuction(auctionInfo:any): Observable<Auction> {
    const data = new AuctionRequest(auctionInfo.title, auctionInfo.initialBid, false)
    return this.http.post<Auction>(this.auctionsUlr, data, this.httpOptions).pipe(
      map((data:Auction) => {
        data.history = [];
        return data;
      })
    );
  }

  makeBid(auction_id:number, bidInfo:any): Observable<Auction> {
    const data = new BidRequest(bidInfo.bid, bidInfo.maxBid);
    const url = `${this.auctionsUlr}/${auction_id}/bids` 
    return this.http.post<Auction>(url, data, this.httpOptions);
  }

  getAuctionById(auction_id:number): Observable<Auction> {
    return this.http.get<Auction>(`${this.auctionsUlr}/${auction_id}`);
  }

  closeAuction(auction_id:number): Observable<Auction> {
    const data = new AuctionRequest('', 0, true);
    return this.http.put<Auction>(`${this.auctionsUlr}/${auction_id}`, data, this.httpOptions);
  }
}