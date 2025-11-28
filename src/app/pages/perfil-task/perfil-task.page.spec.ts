import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilTaskPage } from './perfil-task.page';

describe('PerfilTaskPage', () => {
  let component: PerfilTaskPage;
  let fixture: ComponentFixture<PerfilTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
