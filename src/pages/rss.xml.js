import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/posts';
import { getConfig } from '../lib/config';

export async function GET(context) {
  const posts = await getAllPosts();
  const config = getConfig();
  
  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      description: post.frontmatter.description,
      link: `/post/${post.slug}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
