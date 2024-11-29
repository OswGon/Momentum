import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoPrivacidadPage } from './aviso-privacidad.page';

describe('AvisoPrivacidadPage', () => {
  let component: AvisoPrivacidadPage;
  let fixture: ComponentFixture<AvisoPrivacidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
