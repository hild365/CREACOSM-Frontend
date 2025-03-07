import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FenetreTutoComponent } from './fenetre-tuto.component';

describe('FenetreTutoComponent', () => {
  let component: FenetreTutoComponent;
  let fixture: ComponentFixture<FenetreTutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FenetreTutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FenetreTutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
