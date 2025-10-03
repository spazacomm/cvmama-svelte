import { loadResume } from '$lib/services/loadResume.js';

export async function load({ params }) {
  return await loadResume(params.id);
}
