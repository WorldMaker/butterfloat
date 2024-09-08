# Stamps

If you've been following along from the [Getting Started][started] path,
we would have most recently explored
[advanced binding tools such as Suspense][suspense]. Stamps are a similar
advanced tool, but may be easier to pick up and explore.

## Optimizing for Server-Side Rendering and/or Progressive Enhancement

Butterfloat is reasonably well-optimized for a good default DOM rendering
experience. In the lifetime of a component, the static parts of the DOM
are built once and only once.

However, sometimes doing things even just once may need to be optimized.
If your website or app is producing lots of the same component, it can
help to memoize the DOM tree creation. If you are worried about time to
meaningful content paint and hoping to serve the under-privileged with
any combination of slow network access, slow browsers, and limited memory,
you might want to bake as much of the static DOM parts as you can into HTML
for the browser's highly optimized HTML parser. There are plenty more
reasons besides those to seek further "server-side rendering" or
"progressive enhancement" tools.

Butterfloat's building blocks for optimizing these scenarios are called
Stamps. Any Butterfloat Component that is designed to be easily unit
tested should be capable of being built into a stamp. If the static DOM
is predictable given the static properties passed into it, you can build
a stamp of every static property variation that makes. With a DOM library
such as JSDOM you should be able to build these stamps easily in Node or
Deno (or even in a browser), either locally ahead of time or automated
in a server-side render.

Stamps have markers for the interactive bindings of a Component and once
a stamp has been associated with that Component with the applicable
properties, the stamp can be used to instantiate a fully interactive
component. Other than making sure that the Component is unit testable
and the static DOM output is deterministic (given specific properties)
and stable there are no other changes to the way that a Component is
written. There's no concept of "server component" or "client component"
to be concerned with. There's no need to mark "islands". Butterfloat
already understands your bindings and will progressively enhance the
stamps you give it into a working, interactive components at runtime.

It is even possible to run Butterfloat components entirely with stamps
and tree shake out all of the DOM building code in the library.

## Build a Stamp from a Simple Component

TODO: An example of building a stamp

## Build a Stamp with Multiple Alternatives

TODO: An example of building a stamp with multiple property-based
alternatives

## Build a Stamp with a Test Context

TODO: Use a Test Context to build a stamp of a ContextComponent

## Add Stamps to a Stamp Collection

TODO: Building a Stamp Collection and using it to run Components

[started]: ./getting-started.md
[suspense]: ./suspense.md
