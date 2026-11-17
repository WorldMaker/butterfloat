import toc, { defaults, Options as TocOptions } from './toc.ts'
export * from './anchors.ts'
import createSlugifier, {
  Options as SlugifierOptions,
} from '@lumeland/core/slugifier.ts'

export interface Options extends Omit<TocOptions, 'slugify'> {
  slugify: Partial<SlugifierOptions> | ((text: string) => string) | undefined
}

export default function tocPlugin(userOptions: Partial<Options> = {}) {
  const options = { ...defaults, ...{ slugify: undefined }, ...userOptions }
  const { slugify } = options

  if (!slugify || typeof slugify !== 'function') {
    options.slugify = createSlugifier(slugify)
  }

  return function (site: Lume.Site) {
    site.hooks.addMarkdownItPlugin(toc, options)
  }
}
