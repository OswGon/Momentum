import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { SignUpPage } from './sign-up.page';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que el formulario sea inválido cuando está vacío
  it('should invalidate the form when empty', () => {
    expect(component.regForm.valid).toBeFalsy();
  });

  // Verifica que el formulario sea válido cuando está lleno
  it('should validate the form when filled', () => {
    component.regForm.controls['fullname'].setValue('Juan Pérez');
    component.regForm.controls['email'].setValue('test@example.com');
    component.regForm.controls['password'].setValue('Password123!');
    component.regForm.controls['politicaPrivacidad'].setValue(true);
    component.regForm.controls['avisoPrivacidad'].setValue(true);
    expect(component.regForm.valid).toBeTruthy();
  });

  // Verifica que se muestre un mensaje de error para el campo de nombre cuando está vacío
  it('should show error message for fullname field when empty', () => {
    let nameInput = fixture.debugElement.query(By.css('ion-input[formControlName="fullname"]'));
    nameInput.triggerEventHandler('ionBlur', null);
    fixture.detectChanges();
    
    let nameError = fixture.debugElement.query(By.css('ion-text[color="red"]'));
    expect(nameError.nativeElement.textContent.trim()).toBe('El campo es requerido');
  });

  // Verifica que se muestre un mensaje de error para el campo de correo electrónico cuando está vacío
  it('should show error message for email field when empty', () => {
    let emailInput = fixture.debugElement.query(By.css('ion-input[formControlName="email"]'));
    emailInput.triggerEventHandler('ionBlur', null);
    fixture.detectChanges();
    
    let emailError = fixture.debugElement.query(By.css('ion-text[color="red"]'));
    expect(emailError.nativeElement.textContent.trim()).toBe('El campo es requerido');
  });

  // Verifica que se llame al método de registro cuando el formulario es válido
  it('should call the signUp method when the form is valid', () => {
    spyOn(component, 'signUp');
    component.regForm.controls['fullname'].setValue('Juan Pérez');
    component.regForm.controls['email'].setValue('test@example.com');
    component.regForm.controls['password'].setValue('Password123!');
    component.regForm.controls['politicaPrivacidad'].setValue(true);
    component.regForm.controls['avisoPrivacidad'].setValue(true);
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.signUp).toHaveBeenCalled();
  });
});
