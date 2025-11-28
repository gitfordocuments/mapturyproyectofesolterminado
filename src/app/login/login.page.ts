import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  password = '';
  loading = false;
  isOnline: boolean = true;
  private networkStatusSub!: Subscription;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private storageService: StorageService
  ) {}

  async iniciarAventura() {

    if (!this.email.trim() || !this.password.trim()) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    this.loading = true;

    try {
      // 1️⃣ LOGIN CON SUPABASE
      const { data, error: loginError } =
        await this.supabaseService.supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

      if (loginError) throw loginError;

      const user = data.user;
      const session = data.session;

      if (!user || !session) {
        throw new Error('No se pudo iniciar sesión correctamente.');
      }

      // 2️⃣ Validar correo confirmado
      if (!user.email_confirmed_at) {
        alert("Debes confirmar tu correo antes de iniciar sesión.");
        return;
      }

      // 3️⃣ OBTENER PERFIL DESDE SUPABASE
      const { data: profile, error: profileError } =
        await this.supabaseService.supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

      if (profileError) throw profileError;

      // 4️⃣ GUARDAR EN STORAGE UNIFICADO
      await this.storageService.set('session', session);
      await this.storageService.set('usuario', {
        id: user.id,
        full_name: profile.full_name,
        email: user.email,
        avatar_url: profile.avatar_url
      });

      console.log("Login exitoso:", user);
      console.log("Perfil cargado:", profile);

      alert("¡Bienvenido! Has iniciado sesión correctamente.");

      // 5️⃣ REDIRIGIR A TABS
      this.router.navigate(['/tabs/homeTask']);

    } catch (error: any) {

      if (error.message.includes("Invalid login credentials")) {
        alert("Credenciales inválidas. Verifica tu correo y contraseña.");
      } else {
        alert("Ocurrió un error: " + error.message);
      }

    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  

}
