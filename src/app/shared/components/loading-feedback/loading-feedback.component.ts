import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading-feedback',
  templateUrl: './loading-feedback.component.html',
  styleUrls: ['./loading-feedback.component.scss'],
})
export class LoadingFeedbackComponent implements OnInit {
  @Input() state: 'loading' | 'loaded' | 'error';
  @Output() retryPressed = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  retry() {
    this.retryPressed.emit();
  }
}
