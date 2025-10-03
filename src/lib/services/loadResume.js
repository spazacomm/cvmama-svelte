// src/lib/server/loadResume.js
import { supabase } from '$lib/supabaseClient.js';
import { error } from '@sveltejs/kit';

export async function loadResume(id) {
  // Fetch resume
  const { data: resume, error: resumeError } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();

  if (resumeError || !resume) {
    throw error(404, 'Resume not found');
  }

  const profileId = resume.profile_id;
  const version = resume.version;

  // Fetch related data
  const [
    { data: profile },
    { data: basics },
    { data: summaries },
    { data: work },
    { data: education },
    { data: skills },
    { data: projects },
    { data: certificates },
    { data: languages },
    { data: volunteers },
    { data: awards },
    { data: publications }
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', profileId).single(),
    supabase.from('basics').select('*').eq('profile_id', profileId).single(),
    supabase.from('profile_summaries').select('*').eq('profile_id', profileId).eq('version', version).single(),

    supabase.from('work_experiences').select(`
      *,
      summary:work_summaries(summary),
      highlights:work_highlights(highlight)
    `).eq('profile_id', profileId)
      .eq('work_summaries.version', version)
      .eq('work_highlights.version', version)
      .order('start_date', { ascending: false }),

    supabase.from('education').select('*, courses:education_courses(course)')
      .eq('profile_id', profileId)
      .order('start_date', { ascending: true }),

    supabase.from('skills').select('*, keywords:skill_keywords(keyword)')
      .eq('profile_id', profileId),

    supabase.from('projects').select(`
      *,
      summary:project_summaries!inner(summary),
      highlights:project_highlights!inner(highlight)
    `).eq('profile_id', profileId)
      .eq('project_summaries.version', version)
      .eq('project_highlights.version', version)
      .order('start_date', { ascending: false }),

    supabase.from('certificates').select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: false }),

    supabase.from('languages').select('*').eq('profile_id', profileId),

    supabase.from('volunteer_experiences').select(`
      *,
      summary:volunteer_summaries!inner(summary),
      highlights:volunteer_highlights!inner(highlight)
    `).eq('profile_id', profileId)
      .eq('volunteer_summaries.version', version)
      .eq('volunteer_highlights.version', version)
      .order('start_date', { ascending: false }),

    supabase.from('awards').select(`
      *,
      summary:award_summaries!inner(summary)
    `).eq('profile_id', profileId)
      .eq('award_summaries.version', version)
      .order('date', { ascending: false }),

    supabase.from('publications').select(`
      *,
      summary:publication_summaries!inner(summary)
    `).eq('profile_id', profileId)
      .eq('publication_summaries.version', version)
      .order('release_date', { ascending: false })
  ]);

  return {
    resume,
    profile,
    basics,
    summary: summaries,
    work: work || [],
    education: education || [],
    skills: skills || [],
    projects: projects || [],
    certificates: certificates || [],
    languages: languages || [],
    volunteers: volunteers || [],
    awards: awards || [],
    publications: publications || []
  };
}
