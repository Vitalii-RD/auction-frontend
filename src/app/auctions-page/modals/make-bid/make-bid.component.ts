import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-make-bid',
  templateUrl: './make-bid.component.html',
  styleUrls: ['./make-bid.component.scss']
})
export class MakeBidComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter()
  @Output() submitMakeBidEvent = new EventEmitter();
  
  defaultBidForm = {
    bid: 0
  }

  bidForm = this.formBuilder.group(this.defaultBidForm);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {}

  onSubmitMakeBid() {
    this.submitMakeBidEvent.emit(this.bidForm.value);
    this.bidForm.reset(this.defaultBidForm);
  }
}
