import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LugarDetallePage } from './lugar-detalle.page';

describe('LugarDetallePage', () => {
  let component: LugarDetallePage;
  let fixture: ComponentFixture<LugarDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
