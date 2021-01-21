
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import Auction from 'src/types/Auction';

@Injectable({ providedIn: 'root' })
export class AuctionService {
  
  private auctionsUlr = environment.url + '/auctions';

  constructor(private http: HttpClient) {}

  getAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionsUlr)
    .pipe(
      retry(1)
    )
  }
}