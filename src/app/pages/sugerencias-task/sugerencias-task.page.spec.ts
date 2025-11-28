import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SugerenciasTaskPage } from './sugerencias-task.page';

describe('SugerenciasTaskPage', () => {
  let component: SugerenciasTaskPage;
  let fixture: ComponentFixture<SugerenciasTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SugerenciasTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
