import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-test',
  imports: [],
  templateUrl: './change-test.component.html',
  styleUrl: './change-test.component.scss'
})
export class ChangeTestComponent {

  @Output() testChange=new EventEmitter<void>();

  changeTest(){
    console.log("button clicked")
    this.testChange.emit();
  }
}
