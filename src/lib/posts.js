import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDir = path.resolve(process.cwd(), 'post');

function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}/${month}/${day}`;
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const chineseCharsPerMinute = 400;
  
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  
  const totalMinutes = (chineseChars / chineseCharsPerMinute) + (englishWords / wordsPerMinute);
  
  return Math.ceil(totalMinutes);
}

function generateTOC(content) {
  const headings = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const slug = text.toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      headings.push({
        level,
        text,
        slug
      });
    }
  });
  
  return headings;
}

function parseMd(filePath, slug) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  
  let processedContent = content
    .replace(
      /!\[(.*?)\]\(\.\/(.*?)\)/g,
      (match, alt, filename) => {
        return `<img src="/post/${slug}/${filename}" alt="${alt}" loading="lazy">`;
      }
    )
    .replace(
      /!\[(.*?)\]\(([^h][^t][^t][^p].*?\.(png|jpg|jpeg|gif|svg|webp))\)/gi,
      (match, alt, filename) => {
        if (filename.startsWith('/') || filename.startsWith('http')) {
          return match;
        }
        return `<img src="/post/${slug}/${filename}" alt="${alt}" loading="lazy">`;
      }
    );
  
  const html = marked.parse(processedContent, { async: false });
  const readingTime = calculateReadingTime(content);
  const toc = generateTOC(content);
  return { data, html, readingTime, content, toc };
}

export async function getAllPosts() {
  const entries = fs.readdirSync(postsDir, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const mdPath = path.join(postsDir, entry.name, 'index.md');
    if (!fs.existsSync(mdPath)) continue;

    const { data, html, readingTime } = parseMd(mdPath, entry.name);
    
    let cover = data.cover || data.image || '';
    if (cover && cover.startsWith('./')) {
      cover = `/post/${entry.name}/${cover.substring(2)}`;
    }

    posts.push({
      slug: entry.name,
      frontmatter: {
        title: data.title || entry.name,
        date: formatDate(data.date || data.published || ''),
        description: data.description || '',
        tags: data.tags || [],
        category: data.category || '',
        cover: cover,
        draft: data.draft || false,
      },
      html,
      readingTime,
    });
  }

  return posts
    .filter(post => !post.frontmatter.draft)
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

export async function getPost(slug) {
  const mdPath = path.join(postsDir, slug, 'index.md');
  if (!fs.existsSync(mdPath)) return null;

  const { data, html, readingTime, content, toc } = parseMd(mdPath, slug);
  
  let cover = data.cover || data.image || '';
  if (cover && cover.startsWith('./')) {
    cover = `/post/${slug}/${cover.substring(2)}`;
  }

  return {
    slug,
    frontmatter: {
      title: data.title || slug,
      date: formatDate(data.date || data.published || ''),
      description: data.description || '',
      tags: data.tags || [],
      category: data.category || '',
      cover: cover,
      draft: data.draft || false,
    },
    html,
    readingTime,
    content,
    toc,
  };
}

export async function getArchives() {
  const posts = await getAllPosts();
  const archives = {};

  posts.forEach(post => {
    const date = new Date(post.frontmatter.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!archives[year]) {
      archives[year] = {};
    }

    if (!archives[year][month]) {
      archives[year][month] = [];
    }

    archives[year][month].push(post);
  });

  const sortedArchives = {};
  Object.keys(archives)
    .sort((a, b) => b - a)
    .forEach(year => {
      sortedArchives[year] = {};
      Object.keys(archives[year])
        .sort((a, b) => b - a)
        .forEach(month => {
          sortedArchives[year][month] = archives[year][month];
        });
    });

  return sortedArchives;
}

export async function getCategories() {
  const posts = await getAllPosts();
  const categories = {};

  posts.forEach(post => {
    const category = post.frontmatter.category || '未分类';
    
    if (!categories[category]) {
      categories[category] = [];
    }
    
    categories[category].push(post);
  });

  return categories;
}
