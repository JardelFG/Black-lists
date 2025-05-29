import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-display-tag',
  templateUrl: './display-tag.component.html',
  styleUrl: './display-tag.component.sass',
})
export class DisplayTagComponent {
  @Input() title = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  handleClick(): void {
    this.onClick.emit();
  }
}
