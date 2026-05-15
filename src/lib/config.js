import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'personal', 'config.json');

export function getConfig() {
  try {
    const configData = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config file:', error);
    return getDefaultConfig();
  }
}

function getDefaultConfig() {
  return {
    site: {
      title: "My Blog",
      description: "记录生活，分享技术，探索未知的世界",
      url: "https://your-site.vercel.app",
      author: "Your Name",
      email: "your-email@example.com"
    },
    social: {
      github: "https://github.com/halei0v0",
      twitter: "",
      bilibili: "",
      email: "your-email@example.com"
    },
    navigation: [
      { name: "首页", url: "/" },
      { name: "分类", url: "/categories" },
      { name: "归档", url: "/archives" },
      { name: "友链", url: "/friends" },
      { name: "关于", url: "/about" }
    ],
    footer: {
      copyright: "Powered by Astro & Zero Blog",
      showRSS: true
    },
    friends: [],
    avatar: {
      text: "B",
      useImage: false,
      imageUrl: ""
    },
    logo: {
      useImage: false,
      imageUrl: ""
    }
  };
}
