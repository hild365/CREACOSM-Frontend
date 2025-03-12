import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-and-drop-item',
  imports: [DragDropModule],
  templateUrl: './drag-and-drop-item.component.html',
  styleUrl: './drag-and-drop-item.component.scss'
})
export class DragAndDropItemComponent {
  items=["Beurre karité", "Aloe Vera"]
  test: string[]=[]
  canDrop = () => this.test.length < 1;
  drop(event: CdkDragDrop<string[]>){
    if (!event.previousContainer || !event.container) return;

    if (event.container.id === 'testList' && this.test.length >= 1) {
      // Empêcher l'ajout de plus d'un élément
      return;
    }

    if (event.previousContainer === event.container) {
      // Déplacement dans la même liste
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Déplacement entre les listes
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  }
}
}
