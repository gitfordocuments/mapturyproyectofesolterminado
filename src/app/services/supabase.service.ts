import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;

  destinosActualizados = new BehaviorSubject<boolean>(false);

  constructor() {
    const supabaseUrl = 'https://uirxovgydnoyldbhtsyf.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcnhvdmd5ZG5veWxkYmh0c3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjIwMDcsImV4cCI6MjA3ODc5ODAwN30.zfBnLWACmiQ72y23b3qx8NA5PMg_aqzDTtAh7nYTb50';

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      realtime: {
        params: { eventsPerSecond: 10 },
      },
    });

    this.escucharCambiosDestinos();
  }

  // ======================
  //   PERFIL
  // ======================

  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async upsertProfile(profile: any) {
    const { data, error } = await this.supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'id' });

    if (error) throw error;
    return data;
  }

  // ======================
  //   AVATAR
  // ======================

  async uploadAvatar(userId: string, file: Blob): Promise<string> {
    try {
      const fileExt = file.type.split('/')[1] || 'jpeg';
      const filePath = `${userId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await this.supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          contentType: file.type || 'image/jpeg',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = this.supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('❌ Error en uploadAvatar:', error);
      throw error;
    }
  }

  // ======================
  //   DESTINOS
  // ======================

  async subirImagenDestino(file: File, fileName: string) {
    const { data, error } = await this.supabase.storage
      .from('destinos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = this.supabase.storage
      .from('destinos')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async agregarDestino(destino: any) {
    const { data, error } = await this.supabase
      .from('destinos')
      .insert([destino]);

    if (error) throw error;
    return data;
  }

  async getDestinos() {
    const { data, error } = await this.supabase
      .from('destinos')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getDestinoById(id: string) {
    const { data, error } = await this.supabase
      .from('destinos')
      .select(
        `
        id,
        titulo,
        descripcion,
        imagen_url,
        latitud,
        longitud,
        creado_por,
        created_at
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error obteniendo destino por ID:', error);
      return null;
    }

    return data;
  }

  // ======================
  //   REALTIME
  // ======================

  escucharCambiosDestinos() {
    this.supabase
      .channel('realtime_destinos')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'destinos',
        },
        (payload) => {
          console.log('Cambio detectado:', payload);
          this.destinosActualizados.next(true);
        }
      )
      .subscribe();
  }

  // ======================
  //   AUTH
  // ======================

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}
