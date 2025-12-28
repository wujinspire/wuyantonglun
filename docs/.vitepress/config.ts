import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getChapterSidebar() {
  const chaptersDir = path.resolve(__dirname, '../chapters')
  if (!fs.existsSync(chaptersDir)) return []

  const files = fs.readdirSync(chaptersDir)
    .filter(f => f.endsWith('.md'))
    .sort()

  return files.map(f => {
    const name = f.replace('.md', '')
    const match = name.match(/^(\d+)_(.+)$/)
    const text = match ? `${match[1]} ${match[2]}` : name
    return { text, link: `/chapters/${name}` }
  })
}

export default defineConfig({
  title: '物演通论',
  description: '递弱代偿 · 精要解读',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '章节', link: '/chapters/001_为何惊异' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/chapters/': [
        {
          text: '全部章节',
          items: getChapterSidebar()
        }
      ]
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: '基于 Gemini 3 Pro 深度分析',
      copyright: '© 2025 <a href="https://jinspire.dev" target="_blank">Jinspire</a>'
    }
  }
})

