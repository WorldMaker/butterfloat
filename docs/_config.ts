import lume from '@lumeland/lume'
import basePath from '@lumeland/plugin-base-path'
import nav from '@lumeland/plugin-nav'
import resolveUrls from '@lumeland/plugin-resolve-urls'
import sass from '@lumeland/plugin-sass'
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

site.add('assets/butterfloat.svg')
site.use(
  sass({ options: { loadPaths: [path.resolve('node_modules/bulma/sass')] } }),
)
site.add('assets/style.scss')

export default site
