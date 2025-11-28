import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTaskPage } from './home-task.page';

describe('HomeTaskPage', () => {
  let component: HomeTaskPage;
  let fixture: ComponentFixture<HomeTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
