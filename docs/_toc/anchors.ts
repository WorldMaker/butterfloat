import type { StateCore } from 'markdown-it'

export interface HeaderLinkOptions {
  class: string | false
}

const headerLinkDefaults: HeaderLinkOptions = {
  class: 'header-anchor',
}

/**
 * Generate the anchor with the whole header. Example:
 *
 * ```html
 * <h1 id="foo">This is the title</h1>
 * is converted to:
 * <h1 id="foo"><a href="#foo">This is the title</a></h1>
 * ```
 */
export function headerLink(userOptions: Partial<HeaderLinkOptions> = {}) {
  const options = Object.assign({}, headerLinkDefaults, userOptions)

  return function anchor(slug: string, state: StateCore, i: number) {
    const linkOpen = new state.Token('link_open', 'a', 1)
    linkOpen.attrSet('href', `#${slug}`)

    if (options.class) {
      linkOpen.attrSet('class', options.class)
    }

    const content = new state.Token('inline', '', 0)
    content.children = [
      linkOpen,
      ...(state.tokens[i + 1].children ?? []),
      new state.Token('link_close', 'a', -1),
    ]

    state.tokens[i + 1] = content
  }
}

export interface LinkInsideHeaderOptions {
  class: string | false
  placement: 'before' | 'after'
  ariaHidden: boolean
  content: string
}

const LinkInsideHeaderOptions: LinkInsideHeaderOptions = {
  class: 'header-anchor',
  placement: 'after',
  ariaHidden: false,
  content: '#',
}

/**
 * Generate the anchor inside the header. Example:
 *
 * ```html
 * <h1 id="foo">This is the title</h1>
 * is converted to:
 * <h1 id="foo"><a href="#foo">#</a>This is the title</h1>
 * ```
 */
export function linkInsideHeader(
  userOptions: Partial<LinkInsideHeaderOptions> = {},
) {
  const options = Object.assign({}, LinkInsideHeaderOptions, userOptions)

  return function anchor(slug: string, state: StateCore, i: number) {
    const linkOpen = new state.Token('link_open', 'a', 1)
    linkOpen.attrSet('href', `#${slug}`)

    if (options.class) {
      linkOpen.attrSet('class', options.class)
    }

    if (options.ariaHidden) {
      linkOpen.attrSet('aria-hidden', 'true')
    }

    const content = new state.Token('html_inline', '', 0)
    content.content = options.content
    content.meta = { isPermalinkSymbol: true }

    const linkTokens = [
      linkOpen,
      content,
      new state.Token('link_close', 'a', -1),
    ]

    const space = new state.Token('text', '', 0)
    space.content = ' '

    if (options.placement === 'after') {
      state.tokens[i + 1].children?.push(space, ...linkTokens)
    } else {
      state.tokens[i + 1].children?.unshift(...linkTokens, space)
    }
  }
}
