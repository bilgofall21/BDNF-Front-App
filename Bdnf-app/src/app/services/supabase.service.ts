import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor(){
    this.supabase = createClient(
      'https://mhrylkimbxazzmlyrtif.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ocnlsa2ltYnhhenptbHlydGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NTAzOTgsImV4cCI6MjA0MTAyNjM5OH0.MVhcIDDAXI-LZEXgFckwoWxdKkNkiKqA1bnAE1sU4zo'
    )
  }

  getSupabaseClient(){
    return this.supabase
  }

  async uploadImage(file: File): Promise<string | null> {
    const fileName = `${Date.now()}_${file.name}`;

    // Étape 1 : Uploader le fichier
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('realisations')
      .upload(`public/${fileName}`, file);

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      return null;
    }

    // Étape 2 : Récupérer l'URL publique du fichier uploadé
    const { data } = this.supabase.storage
      .from('realisations')
      .getPublicUrl(`public/${fileName}`);

    return data.publicUrl;
  }


}
