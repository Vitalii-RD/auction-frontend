
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import Auction from 'src/types/Auction';

class AuctionRequest {
  itemName:string
  ownerId:number;
  initialBid:number;
  done:boolean;

  constructor(itemName:string, ownerId:number, initialBid:number, done:boolean) {
    this.itemName = itemName;
    this.ownerId = ownerId;
    this.initialBid = initialBid;
    this.done = done;
  }
}

@Injectable({ providedIn: 'root' })
export class AuctionService {
  
  private auctionsUlr = environment.url + '/auctions';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionsUlr)
    .pipe(
      retry(1)
    )
  }

  createAuction(auctionInfo:any, user_id:number): Observable<Auction> {
    const data = new AuctionRequest(auctionInfo.title, user_id, auctionInfo.initialBid, false)
    return this.http.post<Auction>(this.auctionsUlr, data, this.httpOptions).pipe(
      map((data:Auction) => {
        data.history = [];
        return data;
      })
    );
  }
}