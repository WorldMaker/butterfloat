# Pure, RxJS Observables

From an pure [RxJS] perspective, Knockout's Observables were more accurately
Subjects. It was sometimes too easy to leak private state-changing
APIs across API boundaries. There's nothing wrong with using Subjects
to store tiny bits of "atomic" state, in an Observable world, but
Butterfloat wants to help you better encapsulate public versus
private views of that state. (This includes a handy utility wrapper
around `BehaviorSubject<T>` named `butterfly`.)

Also, we all remember the magic of `ko.computed`, but with RxJS so
much of the power is appropriate use of RxJS operators in smart
pipelines. Butterfloat believes in doing the right things with RxJS
operators and avoiding "magic" Observable state and change
detection strategies like `ko.computed` was.

It's easy to see the legacy of Knockout in the way that its
"Observables" (Subjects) continued to influence "Signals" and related
ideas in later languages, and all sorts of "automated" and magic
change detection and signal detection logic. Butterfloat tries to
follow the other fork in the road of Knockout's legacy if it had
lived up to the name Observable that it chose to use and tried for
greater purity and more powerful usages of Observable scheduling
and operators.

I think one of the biggest challenges but also the greatest opportunities
that modern [ReactiveX] (RxJS) Observables gift us is pushing us to think
functionally and reactively to every bit of state that can change in an
application. When you can avoid escape hatches back to more imperative
code I feel like you gain so much in reliability and reasoning across
complex timing. I find a lot of value in being able to test complex timing
scenarios very easily with fake time using tools like [RxJS marble testing].

[RxJS]: https://rxjs.dev
[ReactiveX]: https://reactivex.io
[RxJS marble testing]: https://rxjs.dev/guide/testing/marble-testing
