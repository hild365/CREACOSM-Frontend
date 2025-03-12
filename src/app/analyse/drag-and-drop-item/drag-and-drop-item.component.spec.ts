import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropItemComponent } from './drag-and-drop-item.component';

describe('DragAndDropItemComponent', () => {
  let component: DragAndDropItemComponent;
  let fixture: ComponentFixture<DragAndDropItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDropItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
