import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
  const { data, error } = await supabase
    .from('resumes')
    .select(`
      *,
      jobs (*),
      profiles (*)
    `)
    .eq('id', params.id)
    .single();

  if (error) {
    console.error(error);
    return { resume: null };
  }

  return { resume: data };
}
