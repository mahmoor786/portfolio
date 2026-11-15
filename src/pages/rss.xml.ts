import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { url } from '../data/url';
import { getPosts } from '../data/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — Blog`,
    description: site.description,
    site: new URL(url('/'), context.site).href,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: url(`/blog/${p.id}/`) })),
  });
}
