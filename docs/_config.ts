import lume from 'lume/mod.ts'
import basePath from 'lume/plugins/base_path.ts'
import nav from 'lume/plugins/nav.ts'
import resolveUrls from 'lume/plugins/resolve_urls.ts'
import sass from 'lume/plugins/sass.ts'
import title from 'lume_markdown_plugins/title.ts'
import toc from 'lume_markdown_plugins/toc.ts'
import { alertPlugin } from 'npm:markdown-it-github-alert'
import Shiki from 'npm:@shikijs/markdown-it'

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
site.use(title())
site.use(toc())

site.add('assets/butterfloat.svg')
site.use(sass())
site.add('assets/style.scss')

export default site
