import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleTaskPage } from './detalle-task.page';

describe('DetalleTaskPage', () => {
  let component: DetalleTaskPage;
  let fixture: ComponentFixture<DetalleTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
