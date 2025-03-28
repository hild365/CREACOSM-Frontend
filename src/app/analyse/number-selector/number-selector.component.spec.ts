import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSelectorComponent } from './number-selector.component';

describe('NumberSelectorComponent', () => {
  let component: NumberSelectorComponent;
  let fixture: ComponentFixture<NumberSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
