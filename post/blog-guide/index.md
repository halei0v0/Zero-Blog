---
title: '博客使用详细介绍'
date: '2026-05-15'
description: '详细介绍博客的文件夹结构、配置方法和使用技巧，帮助你快速上手和自定义博客。'
category: '介绍'
tags: [教程, 配置, 使用指南]
---

# 博客使用详细介绍

欢迎来到博客使用指南！本文将详细介绍博客的文件夹结构、配置方法和使用技巧，帮助你快速上手和自定义博客。

## 项目结构

博客采用清晰的文件夹结构，便于管理和维护：

```
blog/
├── post/                    # 文章文件夹
├── personal/                # 个人配置文件夹
├── about/                   # 关于页面文件夹
├── images/                  # 图片资源文件夹
├── src/                     # 源代码文件夹
│   ├── layouts/            # 布局组件
│   ├── pages/              # 页面文件
│   └── lib/                # 工具函数
└── public/                  # 静态资源文件夹
```

## 文章管理

### post 文件夹

`post` 文件夹是存放所有博客文章的地方。每篇文章都是一个独立的文件夹，包含 `index.md` 文件。

#### 文章结构

```
post/
├── my-first-post/
│   ├── index.md            # 文章内容
│   └── cover.jpg           # 文章封面图（可选）
└── another-post/
    ├── index.md
    └── images/             # 文章图片（可选）
```

#### 文章格式

每篇文章的 `index.md` 文件都包含 frontmatter 和正文：

```markdown
---
title: 文章标题
date: 2026-05-15
description: 文章描述
category: 分类名称
tags: [标签1, 标签2]
cover: ./cover.jpg
draft: false
---

文章正文内容...
```

#### Frontmatter 字段说明

- **title**: 文章标题（必需）
- **date**: 发布日期（必需）
- **description**: 文章描述（可选）
- **category**: 文章分类（可选）
- **tags**: 文章标签数组（可选）
- **cover**: 文章封面图路径（可选）
- **draft**: 是否为草稿（可选，默认 false）

#### 图片引用

文章中可以引用相对路径的图片：

```markdown
![图片描述](./image.png)
```

## 个人配置

### personal 文件夹

`personal` 文件夹包含博客的所有个人配置。

#### config.json

主配置文件，包含以下配置项：

##### site - 网站基本信息

```json
{
  "site": {
    "title": "My Blog",
    "description": "记录生活，分享技术",
    "url": "https://your-site.vercel.app",
    "author": "Your Name",
    "email": "your-email@example.com"
  }
}
```

##### social - 社交链接

```json
{
  "social": {
    "github": "https://github.com/username",
    "twitter": "",
    "bilibili": "",
    "email": "your-email@example.com"
  }
}
```

##### navigation - 导航菜单

```json
{
  "navigation": [
    { "name": "首页", "url": "/" },
    { "name": "分类", "url": "/categories" },
    { "name": "归档", "url": "/archives" }
  ]
}
```

##### footer - 页脚设置

```json
{
  "footer": {
    "copyright": "Powered by Astro",
    "showRSS": true
  }
}
```

##### friends - 友情链接

```json
{
  "friends": [
    {
      "name": "友链名称",
      "url": "https://example.com",
      "avatar": "https://example.com/avatar.png",
      "description": "友链描述"
    }
  ]
}
```

##### avatar - 头像设置

```json
{
  "avatar": {
    "text": "B",
    "useImage": true,
    "imageUrl": "/images/myself.png"
  }
}
```

##### logo - Logo设置

```json
{
  "logo": {
    "useImage": true,
    "imageUrl": "/images/logo.png"
  }
}
```

### about 文件夹

`about` 文件夹包含关于页面的配置。

#### config.json

关于页面配置文件：

```json
{
  "title": "关于我",
  "subtitle": "记录生活，分享技术",
  "introduction": [
    "第一段介绍",
    "第二段介绍"
  ],
  "techStack": [
    { "name": "Astro", "desc": "现代静态站点生成器" }
  ],
  "features": [
    "深色/浅色主题切换",
    "文章分类和标签系统"
  ]
}
```

## 图片资源

### images 文件夹

`images` 文件夹用于存放博客的全局图片资源：

- **logo.png**: 网站Logo
- **myself.png**: 个人头像
- 其他全局图片

#### 图片引用

在配置中使用 `/images/filename.ext` 引用图片：

```json
{
  "avatar": {
    "imageUrl": "/images/myself.png"
  }
}
```

## 博客功能

### 文章分类

博客支持文章分类功能。在文章的 frontmatter 中添加 `category` 字段：

```markdown
---
category: 技术分享
---
```

### 文章标签

支持多标签系统：

```markdown
---
tags: [JavaScript, 教程, 前端]
---
```

### 草稿功能

未完成的文章可以标记为草稿：

```markdown
---
draft: true
---
```

草稿文章不会在生产环境中显示。

### 阅读时间

博客会自动计算文章的阅读时间，基于中文字符和英文单词数量。

### 文章目录

博客会自动从文章中提取标题生成目录（TOC），方便读者导航。

### 深色模式

博客支持深色/浅色主题切换，用户偏好会保存在本地存储中。

### RSS订阅

博客提供RSS订阅功能，用户可以通过 `/rss.xml` 订阅博客更新。

## 开发和部署

### 本地开发

```bash
npm run dev
```

启动开发服务器，访问 `http://localhost:4321`

### 构建生产版本

```bash
npm run build
```

构建静态文件到 `dist` 文件夹。

### 部署

博客可以部署到任何静态网站托管平台：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 最佳实践

### 文章写作

1. 使用清晰的标题层级
2. 添加文章描述，提高SEO效果
3. 合理使用标签和分类
4. 图片使用相对路径
5. 为图片添加描述性alt文本

### 配置管理

1. 定期备份配置文件
2. 使用版本控制管理配置
3. 不要在配置中存储敏感信息
4. 保持JSON格式正确

### 性能优化

1. 压缩图片文件
2. 使用适当的图片格式
3. 避免在文章中使用过大的图片
4. 合理使用草稿功能

## 常见问题

### 如何修改网站标题？

编辑 `personal/config.json` 中的 `site.title` 字段。

### 如何添加新文章？

1. 在 `post` 文件夹中创建新文件夹
2. 在文件夹中创建 `index.md` 文件
3. 添加 frontmatter 和文章内容

### 如何修改导航菜单？

编辑 `personal/config.json` 中的 `navigation` 数组。

### 如何添加友情链接？

编辑 `personal/config.json` 中的 `friends` 数组，添加新的友链对象。

### 如何修改关于页面？

编辑 `about/config.json` 文件，修改相应的配置项。

## 总结

通过本文的介绍，你应该已经了解了博客的基本结构和使用方法。博客的设计理念是简洁、易用、可定制。通过修改配置文件，你可以轻松自定义博客的外观和功能。

如果你有任何问题或建议，欢迎在评论区留言或通过邮件联系我。祝你使用愉快！
