import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @Input() error:string;
  @Input() response:string;
  @Output() closeModalEvent = new EventEmitter();

  constructor() {
    this.error = '';
    this.response = '';
  }

  ngOnInit(): void {
  }

}
