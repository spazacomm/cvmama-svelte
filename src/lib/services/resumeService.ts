import { supabase } from '$lib/supabaseClient';

export async function uploadResume({
  file,
  candidate_name,
  email,
  whatsapp_number
}: {
  file: File;
  candidate_name: string;
  email: string;
  whatsapp_number: string;
}) {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `resumes/${crypto.randomUUID()}.${fileExt}`;

    // Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Public URL (or use signed if private)
    const { data: { publicUrl } } = supabase
      .storage
      .from('resumes')
      .getPublicUrl(filePath);

    // Insert record into DB
    const { error: insertError } = await supabase.from('profiles').insert({
      candidate_name,
      email,
      whatsapp_number,
      file_url: publicUrl
    });

    if (insertError) throw insertError;

    return { success: true, url: publicUrl };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
