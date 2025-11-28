import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-perfil-task',
  templateUrl: './perfil-task.page.html',
  styleUrls: ['./perfil-task.page.scss'],
})
export class PerfilTaskPage implements OnInit {

  userId!: string;
  userName = '';
  userEmail = '';
  profileImage = 'assets/default-avatar.png';
  isEditing = false;
  selectedLanguage = 'es';

  constructor(
    private storageService: StorageService,
    private supabaseService: SupabaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const user = await this.storageService.get('usuario');

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.userId = user.id;
    this.userEmail = user.email;
    this.userName = user.full_name || user.user_metadata?.full_name || 'Usuario';

    const profile = await this.supabaseService.getProfile(this.userId);

    if (profile) {
      this.userName = profile.full_name ?? this.userName;
      this.profileImage = profile.avatar_url ?? this.profileImage;
    }
  }

  async changePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (!image?.dataUrl) return;

      const response = await fetch(image.dataUrl);
      const blob = await response.blob();

      const publicUrl = await this.supabaseService.uploadAvatar(this.userId, blob);

      this.profileImage = publicUrl;
      await this.saveProfile();

    } catch (error) {
      console.error('Error al cambiar la foto:', error);
    }
  }

  async saveProfile() {
  try {
    const profile = {
      id: this.userId,
      full_name: this.userName.trim(),   // 👈 FALTABA ESTO
      avatar_url: this.profileImage,
      updated_at: new Date(),
    };

    await this.supabaseService.upsertProfile(profile);

    await this.storageService.set('usuario', {
      ...profile,
      email: this.userEmail
    });

    const alert = await this.alertCtrl.create({
      header: 'Perfil actualizado',
      message: 'Tus cambios se guardaron correctamente.',
      buttons: ['OK'],
    });
    await alert.present();

    this.isEditing = false;
  } catch (error) {
    console.error('Error al guardar el perfil:', error);
  }
}



  toggleEdit() {
    if (this.isEditing) {
      this.saveProfile();
    }
    this.isEditing = !this.isEditing;
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            await this.supabaseService.signOut();
            await this.storageService.clear();
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    alert.present();
  }

  goToFavorites() {
    this.router.navigate(['/favorites-task']);
  }

  goToRegister() {
  this.router.navigate(['/register']);
}

}
