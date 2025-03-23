import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { SelectorOptions } from '../models/selector-options';

@Component({
  selector: 'app-number-selector',
  imports: [],
  templateUrl: './number-selector.component.html',
  styleUrl: './number-selector.component.scss'
})
export class NumberSelectorComponent {
  @Input() options!: SelectorOptions
  @ViewChild('numberInput') numberInputRef!: ElementRef;

  onValueChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    this.numberInputRef.nativeElement.value = newValue;
  }
  getValue(){
    return this.numberInputRef.nativeElement.valueAsNumber;
  }
}
