# 个人配置说明

这个文件夹包含了博客的所有可配置信息。修改 `config.json` 文件即可自定义你的博客。

## 配置项说明

### site - 网站基本信息

- `title`: 网站标题
- `description`: 网站描述
- `url`: 网站URL（用于RSS等）
- `author`: 作者名称
- `email`: 联系邮箱

### social - 社交链接

- `github`: GitHub主页
- `twitter`: Twitter主页（可选）
- `bilibili`: B站主页（可选）
- `email`: 联系邮箱

### navigation - 导航菜单

- `name`: 菜单项名称
- `url`: 菜单项链接

### footer - 页脚设置

- `copyright`: 版权信息
- `showRSS`: 是否显示RSS链接

### friends - 友情链接

- `name`: 友链名称
- `url`: 友链地址
- `avatar`: 头像URL
- `description`: 友链描述

### about - 关于页面配置

关于页面的配置单独存放在 `about/config.json` 文件中。

- `title`: 标题
- `subtitle`: 副标题
- `introduction`: 介绍段落（数组）
- `techStack`: 技术栈列表
- `features`: 功能列表

### avatar - 头像设置

- `text`: 头像文字（当不使用图片时显示）
- `useImage`: 是否使用图片头像
- `imageUrl`: 图片头像URL（建议放在images文件夹中）

### logo - Logo设置

- `useImage`: 是否使用图片Logo
- `imageUrl`: Logo图片URL（建议放在images文件夹中）

## 图片文件

所有图片文件（如Logo、头像等）建议放在项目根目录的 `images` 文件夹中。

示例：
- Logo: `/images/logo.png`
- 头像: `/images/myself.png`

## 关于页面

关于页面的配置在 `about/config.json` 文件中编辑。

## 使用方法

1. 打开 `config.json` 文件
2. 修改相应的配置项
3. 保存文件
4. 重新构建博客（`npm run build` 或 `npm run dev`）

## 注意事项

- 请确保JSON格式正确
- URL需要包含完整的协议（如 https://）
- 留空的配置项可以删除或保留为空字符串
- 图片文件放在 `images` 文件夹中，使用 `/images/filename.ext` 引用
