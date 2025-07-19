# The Origin Story of Butterfloat

The origins of Butterfloat start, among other places, with major
performance trouble in an Angular app I was working on. I had come from
a background with things like [ReactiveUI] and [Cycle.js]. Angular was
an "everybody knows it" compromise at the time, where I had been
campaigning for React which I was using in other projects at the time.
Part of the compromise was that my rich RxJS background gave me an
opportunity to try to build "clever things" and solve some hard problems
in Angular, such as how you get a complex real-time dashboard with a few
CPU-heavy real-time aggregates to perform well in a user's browser.

One of my first big disappointments, from my background was how much
[Angular failed to live up to RxJS principles] despite seeming to encourage
RxJS use. It had too many escape hatches and compromises that broke
reliability. It tried to be a framework for everyone and ended up a
framework for no one. Use too much RxJS and "fine-grained" reactivity and
suffer the performance consequences; escape hatch from RxJS too much and
too often and feel the reliability consequences of too-heavy Promises and
hard to debug timing scenarios.

But the biggest disappointment was finding out [Angular was haunted] as
the production application I was working on started having direct performance
fights where Release builds (and not development build) were falling into
Zone.js holes and couldn't get out. That lead directly to building the Angular
Component framework [angular-pharkas] to collect some best practices for
fine-grained reactivity under Angular and build much more performant Zoneless
components. (I'm glad that Angular 20 finally does a lot to go Zoneless,
answering the warning I provided many years prior.)

As with many open source projects, the next kick in the pants was getting
laid off from my employer at the time (the one with the performance embattled
Angular-based live dashboard), I delivered [one last angular-pharkas feature],
and was happy to get off the Angular maintenance treadmill for at least
a few months. I was proud to deliver a feature I considered to be easy that
also reflected/worked like an advanced React feature delivered to the
small subset of Angular devs that might stumble upon pharkas.

While my day job was searching for my next day job, I got to taking a
long look at what the state of [my GitHub portfolio] was and wasn't happy with
how much had succumbed to tech debt or looked as ancient as it felt.
There were old tools like Bower and SystemJS in use that made sense at the
time but hadn't aged well, if hadn't also just entirely broke in the
meantime. Most of it was in Knockout, which I still liked, but had flaws
like poor compile-time type checking. I got it into my head that I wanted to
rewrite at least a couple of these old projects in something "modern", and
a lot of things I had learned from pharkas and thought about if I were
doing them from scratch (the running thread of "Project Gawky" thoughts
and asides in the blog posts above, for instance) rather quickly spilled
out into Butterfloat. My sketch pad for the API of Butterfloat 1.0 (titled
"Project Dr. Mario" at that time) was from early-October and my
[Butterfloat 1.0 announcement] was late November. (The name Butterfloat,
as that post also details, came from thinking about Knockout while staring
too much at the logo of the Louisville Muhammad Ali International Airport.
Butterfloat seems a very Louisville name because it seems a lot more
obvious as a relative to "Knockout" to technical people that grew up in
Louisville, which seems fascinating to me, but that's part of what keeps
the name fun.)

I still think I delivered a lot of the advanced features of React, both
the runtime and the developer experience, in a cool, slim package with
Butterfloat.

[Butterfloat 1.5 with Stamps was first officially delivered] almost exactly
a year later. I had a laptop with me on a long-ish European trip and one
of the days a lot of the ideas for Stamps hit me at once and "needed" to
be built, and I had working prototype relatively quickly. Then it was a
couple months of hobby time to polish it and get it released.

[ReactiveUI]: https://www.reactiveui.net/
[Cycle.js]: https://cycle.js.org
[Angular failed to live up to RxJS principles]: https://blog.worldmaker.net/2021/06/26/angular/
[Angular was haunted]: https://blog.worldmaker.net/2022/10/30/angular-components/
[angular-pharkas]: https://worldmaker.net/angular-pharkas/
[one last angular-pharkas feature]: https://blog.worldmaker.net/2023/09/05/pharkas-complete/
[my GitHub portfolio]: https://github.com/WorldMaker/
[Butterfloat 1.0 announcement]: https://blog.worldmaker.net/2023/11/28/butterfloat/
[Butterfloat 1.5 with Stamps was first officially delivered]: https://blog.worldmaker.net/2024/11/17/butterfloat-stamps/
