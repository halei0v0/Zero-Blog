# Zero Blog

一个简洁优雅的个人博客，基于 [Astro](https://astro.build) 构建。

## 特性

- 🎨 **简洁设计** - 清爽的界面，专注于内容
- 🌓 **深色模式** - 支持浅色/深色主题切换
- 📝 **Markdown 写作** - 使用 Markdown 编写文章
- 🏷️ **分类标签** - 文章分类和标签系统
- 📅 **归档功能** - 按时间归档文章
- 🔗 **友链系统** - 展示友情链接
- 📖 **阅读体验** - 阅读时间估算、文章目录导航
- 🖼️ **图片灯箱** - 点击图片放大查看
- 📱 **响应式设计** - 适配各种设备
- 🚀 **快速部署** - 支持 Vercel、Netlify 等平台

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:4321` 查看博客。

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
blog/
├── post/                    # 文章文件夹
│   ├── my-first-post/
│   │   ├── index.md        # 文章内容
│   │   └── cover.jpg       # 文章封面（可选）
│   └── another-post/
│       └── index.md
├── personal/                # 个人配置文件夹
│   └── config.json         # 主配置文件
├── about/                   # 关于页面文件夹
│   └── config.json         # 关于页面配置
├── images/                  # 图片资源文件夹
│   ├── logo.png            # 网站 Logo
│   └── myself.png          # 个人头像
├── src/
│   ├── layouts/            # 布局组件
│   │   └── BaseLayout.astro
│   ├── pages/              # 页面文件
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于页面
│   │   ├── archives.astro  # 归档页面
│   │   ├── categories.astro # 分类页面
│   │   ├── friends.astro   # 友链页面
│   │   └── post/
│   │       └── [...slug].astro # 文章页面
│   └── lib/                # 工具函数
│       ├── config.js       # 配置读取
│       └── posts.js        # 文章处理
├── public/                  # 静态资源文件夹
├── astro.config.mjs        # Astro 配置
└── package.json
```

## 配置说明

### 主配置 (personal/config.json)

```json
{
  "site": {
    "title": "博客标题",
    "description": "博客描述",
    "url": "https://your-site.vercel.app",
    "author": "作者名称",
    "email": "your-email@example.com"
  },
  "social": {
    "github": "https://github.com/username",
    "twitter": "",
    "bilibili": "",
    "email": "your-email@example.com"
  },
  "navigation": [
    { "name": "首页", "url": "/" },
    { "name": "分类", "url": "/categories" },
    { "name": "归档", "url": "/archives" },
    { "name": "友链", "url": "/friends" },
    { "name": "关于", "url": "/about" }
  ],
  "footer": {
    "copyright": "Powered by Astro & Zero Blog",
    "showRSS": true
  },
  "friends": [
    {
      "name": "友链名称",
      "url": "https://example.com",
      "avatar": "头像URL",
      "description": "友链描述"
    }
  ],
  "avatar": {
    "text": "B",
    "useImage": true,
    "imageUrl": "/images/myself.png"
  },
  "logo": {
    "useImage": true,
    "imageUrl": "/images/logo.png"
  }
}
```

### 关于页面配置 (about/config.json)

```json
{
  "title": "关于我",
  "subtitle": "个人简介",
  "introduction": [
    "第一段介绍",
    "第二段介绍"
  ],
  "techStack": [
    { "name": "技术名称", "desc": "技术描述" }
  ],
  "features": [
    "功能特性1",
    "功能特性2"
  ]
}
```

## 写作指南

### 创建新文章

1. 在 `post/` 文件夹中创建新文件夹（如 `my-new-post/`）
2. 在文件夹中创建 `index.md` 文件
3. 编写文章内容

### 文章格式

```markdown
---
title: '文章标题'
date: '2026-05-15'
description: '文章描述'
category: '分类名称'
tags: [标签1, 标签2]
cover: ./cover.jpg
draft: false
---

文章正文内容...
```

### Frontmatter 字段说明

| 字段 | 必需 | 说明 |
|------|------|------|
| title | ✅ | 文章标题 |
| date | ✅ | 发布日期 |
| description | ❌ | 文章描述，用于 SEO 和预览 |
| category | ❌ | 文章分类 |
| tags | ❌ | 文章标签数组 |
| cover | ❌ | 文章封面图路径 |
| draft | ❌ | 是否为草稿，默认 false |

### 图片引用

文章中可以引用相对路径的图片：

```markdown
![图片描述](./image.png)
```

## 部署

### Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 构建命令：`npm run build`
4. 发布目录：`dist`

### GitHub Pages

1. 修改 `astro.config.mjs` 中的 `site` 为你的 GitHub Pages 地址
2. 运行 `npm run build`
3. 将 `dist` 文件夹内容推送到 `gh-pages` 分支

## 自定义

### 主题颜色

在 `src/layouts/BaseLayout.astro` 中修改 CSS 变量：

```css
:root {
  --accent: #4361ee;      /* 主题色 */
  --accent-hover: #3a56d4; /* 悬停色 */
}

[data-theme="dark"] {
  --accent: #60a5fa;
  --accent-hover: #3b82f6;
}
```

### 代码块样式

在 `src/pages/post/[...slug].astro` 中修改代码块样式。

## 技术栈

- [Astro](https://astro.build) - 现代静态站点生成器
- [Markdown](https://markdown.com.cn/) - 简洁的写作方式
- CSS Variables - 主题切换支持
- [marked](https://marked.js.org/) - Markdown 解析
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter 解析

## 许可证

MIT License

## 致谢

感谢 [Astro](https://astro.build) 提供的优秀框架。
