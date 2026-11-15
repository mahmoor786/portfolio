import { getCollection } from 'astro:content';

// Published posts, newest first. Posts marked `draft: true` are left out.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
export const tints = [['#ffe4d6', '#f3d9ff'], ['#dfe6ff', '#eaf6ff'], ['#e2f5ea', '#e3f0ff'], ['#fff0d9', '#ffe0e6'], ['#ece4ff', '#dfe6ff']];
