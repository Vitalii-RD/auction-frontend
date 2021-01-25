import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-bid',
  templateUrl: './make-bid.component.html',
  styleUrls: ['./make-bid.component.scss']
})
export class MakeBidComponent implements OnInit {
  @Input() min!: number
  @Output() closeModalEvent = new EventEmitter()
  @Output() submitMakeBidEvent = new EventEmitter();
  
  defaultBidForm = {
    bid: [null, [Validators.required, (control: AbstractControl) => Validators.min(this.min)(control)]],
    maxBid: [null, [Validators.required,(control: AbstractControl) => Validators.min(this.min)(control)]]
  }

  bidForm = this.formBuilder.group(this.defaultBidForm);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const maxBid = this.bidForm.controls['maxBid'];
    const bid = this.bidForm.get('bid');
    bid?.valueChanges.subscribe(value => {
      maxBid.setValidators([Validators.required, Validators.min(value)])
      maxBid.updateValueAndValidity();
    })
  }

  onSubmitMakeBid() {
    this.submitMakeBidEvent.emit(this.bidForm.value);
    this.bidForm.reset(this.defaultBidForm);
  }
}
