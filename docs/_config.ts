import lume from 'lume/mod.ts'
import nav from 'lume/plugins/nav.ts'
import pagefind from 'lume/plugins/pagefind.ts'
import prism from 'lume/plugins/prism.ts'
import toc from 'lume_markdown_plugins/toc.ts'

// Additional prism languages
import 'npm:prismjs@1.29.0/components/prism-json.js'
import 'npm:prismjs@1.29.0/components/prism-typescript.js'
import 'npm:prismjs@1.29.0/components/prism-jsx.js'
import 'npm:prismjs@1.29.0/components/prism-tsx.js'

const site = lume({
  location: new URL('https://worldmaker.net/butterfloat/'),
})

site.use(nav({ order: 'order=asc title basename' }))
site.use(pagefind())
site.use(
  prism({
    theme: {
      name: 'tomorrow',
      cssFile: '/assets/style.css',
      placeholder: '/* insert-theme-here */',
    },
  }),
)
site.use(toc())

site.add('assets/butterfloat.svg')
site.add('assets/style.css')

export default site
