import lume from "@lumeland/lume"
import basePath from "@lumeland/plugin-base-path"
import nav from "@lumeland/plugin-nav"
import resolveUrls from "@lumeland/plugin-resolve-urls"
import sass from "@lumeland/plugin-sass"
import title from 'lume_markdown_plugins/title.ts'
import toc from 'lume_markdown_plugins/toc.ts'
import { alertPlugin } from "markdown-it-github-alert"
import Shiki from "@shikijs/markdown-it"

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
