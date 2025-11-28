import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre = '';
  email = '';
  password = '';
  loading = false;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  async registrarUsuario() {
    if (!this.nombre.trim() || !this.email.trim() || !this.password.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.loading = true;

    try {
      // 1️⃣ Crear usuario en Supabase Auth
      const { data, error } = await this.supabaseService.supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            full_name: this.nombre, // se guarda como metadata
          }
        }
      });

      if (error) throw error;

      const user = data.user;

      if (!user) {
        throw new Error("No se pudo obtener el usuario después del registro.");
      }

      // 2️⃣ Crear perfil en la tabla `profiles`
      const { error: profileError } = await this.supabaseService.supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: this.nombre
        });

      if (profileError) throw profileError;

      console.log("Usuario creado:", user);
      alert('✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.');

      // 3️⃣ Redirigir al login
      this.router.navigate(['/login']);

    } catch (error: any) {
      alert('❌ Error al registrarte: ' + error.message);
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
