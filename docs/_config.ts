import lume from '@lumeland/lume'
import basePath from '@lumeland/plugin-base-path'
import nav from '@lumeland/plugin-nav'
import resolveUrls from '@lumeland/plugin-resolve-urls'
import sass from '@lumeland/plugin-sass'
import toc from '@lumeland/plugin-toc'
import { alertPlugin } from 'markdown-it-github-alert'
import Shiki from '@shikijs/markdown-it'
import path from 'node:path'

const shiki = await Shiki({
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
})

const site = lume(
  {
    location: new URL('https://worldmaker.net/butterfloat/'),
  },
  {
    markdown: {
      plugins: [alertPlugin, shiki],
    },
  },
)

site.use(basePath())
site.use(nav({ order: 'order=asc title basename' }))
site.use(resolveUrls())
site.use(toc())

site.add('assets/butterfloat.svg')
site.use(
  sass({ options: { loadPaths: [path.resolve('node_modules/bulma/sass')] } }),
)
site.add('assets/style.scss')

// Convert all TOC ordered lists to unordered lists with appropriate classes for Bulma menu styling
site.process(['.html'], (pages) => {
  for (const page of pages) {
    const tocs = page.document.querySelectorAll('nav.toc-menu')
    for (const toc of tocs) {
      const outerOl = toc.querySelector('ol')
      if (outerOl) {
        if (outerOl.children.length === 0) {
          toc.remove()
          continue
        }

        const outerUl = page.document.createElement('ul')

        outerOl.replaceWith(outerUl)
        outerUl.append(...outerOl.children)
        outerUl.classList.add('menu-list')

        for (const ol of outerUl.querySelectorAll('ol')) {
          const ul = page.document.createElement('ul')
          ol.replaceWith(ul)
          ul.append(...ol.children)
        }
      } else {
        toc.remove()
      }
    }
  }
})

export default site
