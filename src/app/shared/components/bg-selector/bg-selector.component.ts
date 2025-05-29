import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bg-selector',
  templateUrl: './bg-selector.component.html',
  styleUrl: './bg-selector.component.sass',
})
export class BgSelectorComponent {
  selectedBackground: string = '';
  @Output() backgroundChange = new EventEmitter<string>();

  backgrounds: string[] = ['#FFADAD', '#FFD6A5', '#CAFFBF', '#9BF6FF'];

  selectBackground(color: string) {
    this.selectedBackground = color;
    this.backgroundChange.emit(color);
  }
}
