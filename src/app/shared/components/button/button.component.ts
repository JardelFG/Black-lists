import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClick(): void {
    this.onClick.emit();
  }
}
