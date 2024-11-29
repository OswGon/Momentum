import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { SignInPage } from './sign-in.page';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que el formulario sea inválido cuando está vacío
  it('should invalidate the form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  // Verifica que el formulario sea válido cuando está lleno
  it('should validate the form when filled', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('Password123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  // Verifica que se muestre un mensaje de error para el campo de correo electrónico cuando está vacío
  it('should show error message for email field when empty', () => {
    let emailInput = fixture.debugElement.query(By.css('ion-input[formControlName="email"]'));
    emailInput.triggerEventHandler('ionBlur', null);
    fixture.detectChanges();
    
    let emailError = fixture.debugElement.query(By.css('ion-text[color="red"]'));
    expect(emailError.nativeElement.textContent.trim()).toBe('El campo es requerido');
  });

  // Verifica que se llame al método de inicio de sesión cuando el formulario es válido
  it('should call the login method when the form is valid', () => {
    spyOn(component, 'login');
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('Password123!');
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.login).toHaveBeenCalled();
  });
});
