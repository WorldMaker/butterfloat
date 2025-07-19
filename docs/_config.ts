import lume from 'lume/mod.ts'
import basePath from 'lume/plugins/base_path.ts'
import nav from 'lume/plugins/nav.ts'
import prism from 'lume/plugins/prism.ts'
import resolveUrls from 'lume/plugins/resolve_urls.ts'
import sass from 'lume/plugins/sass.ts'
import title from 'lume_markdown_plugins/title.ts'
import toc from 'lume_markdown_plugins/toc.ts'
import { alertPlugin } from 'npm:markdown-it-github-alert'

// Additional prism languages
import 'npm:prismjs@1.29.0/components/prism-json.js'
import 'npm:prismjs@1.29.0/components/prism-typescript.js'
import 'npm:prismjs@1.29.0/components/prism-jsx.js'
import 'npm:prismjs@1.29.0/components/prism-tsx.js'

const site = lume(
  {
    location: new URL('https://worldmaker.net/butterfloat/'),
  },
  {
    markdown: {
      plugins: [alertPlugin],
    },
  },
)

site.use(basePath())
site.use(nav({ order: 'order=asc title basename' }))
site.use(resolveUrls())
site.use(
  prism({
    theme: [
      {
        name: 'tomorrow',
        cssFile: '/assets/style.scss',
        placeholder: '/* insert-prism-dark-theme-here */',
      },
      {
        name: 'default',
        cssFile: '/assets/style.scss',
        placeholder: '/* insert-prism-light-theme-here */',
      },
    ],
  }),
)
site.use(title())
site.use(toc())

site.add('assets/butterfloat.svg')
site.use(sass())
site.add('assets/style.scss')

export default site
