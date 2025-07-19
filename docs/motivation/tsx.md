# TSX, but not a Virtual DOM

While [Knockout-inspired], I do not miss trying to runtime debug
change binding issues and want as much "compile-time" type checking as
I can get while building a component.

TSX in Typescript is a powerful compile-time type checked template
language for HTML and similar trees. With TSX Butterfloat can provide
a best-in-class development experience at a fraction of the budget of
some other web views.

Butterfloat does not take a "Virtual DOM" approach, but it
does try to preserve some "Virtual DOM"-like benefits such as easier
component testing with access to DOM-less testing data structures. Instead,
Butterfloat takes a "static-by-default" approach to DOM building and
only runs its components once (and only once) per component instance.

Butterfloat relies entirely on pure observables to signal changes to
be made, and the power of Butterfloat is how it schedules those
changes by default for you. It has no Virtual DOM diff/patch
routines, it binds changes directly to DOM elements.

The only parts of a Butterfloat component that may change are
Observables and Components, everything else is setup once and only
once.

I think Butterfloat offers a great type check experience, leveraging a lot
of intelligence from intelligent usage of some of Typescript's more
advanced features.

> [!NOTE]
> If you are interested in seeing pure observables used in a Virtual
> DOM, consider trying [Cycle.js](https://cycle.js.org).

[Knockout-inspired]: ./knockout.md
