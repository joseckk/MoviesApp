import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-translate-button',
  templateUrl: './translate-button.component.html',
  styleUrls: ['./translate-button.component.scss'],
})
export class TranslateButtonComponent implements OnInit {
  @Output() pressed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onChangedLanguage() {
    this.pressed.emit();
  }
}
