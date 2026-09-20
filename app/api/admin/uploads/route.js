import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requireAdmin, unauthorized } from '../../../../lib/api';
import { getSupabaseAdmin } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']);

export async function POST(request) {
  if (!requireAdmin()) return unauthorized();
  try {
    const data = await request.formData();
    const file = data.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'Selecciona un archivo.' }, { status: 422 });
    if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: 'Solo se permiten JPG, PNG, WebP, AVIF y PDF.' }, { status: 422 });
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'El archivo supera el límite de 10 MB.' }, { status: 422 });

    const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const folder = file.type.startsWith('image/') ? 'images' : 'documents';
    const path = `${folder}/${randomUUID()}.${extension}`;
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage.from('apg-assets').upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    const { data: publicUrl } = supabase.storage.from('apg-assets').getPublicUrl(path);
    return NextResponse.json({ path, url: publicUrl.publicUrl }, { status: 201 });
  } catch (error) {
    console.error(error);
    const status = error.message === 'SUPABASE_NOT_CONFIGURED' ? 503 : 500;
    return NextResponse.json({ error: status === 503 ? 'Supabase Storage no está configurado.' : 'No fue posible subir el archivo.' }, { status });
  }
}
