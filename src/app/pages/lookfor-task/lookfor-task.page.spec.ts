import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LookforTaskPage } from './lookfor-task.page';

describe('LookforTaskPage', () => {
  let component: LookforTaskPage;
  let fixture: ComponentFixture<LookforTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LookforTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
