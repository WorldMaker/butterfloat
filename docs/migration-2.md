---
layout: page.vto
title: Migration From v1 to v2
order: 100
tags: [stable]
---

Butterfloat v1.7 is the transition/preview release for Butterfloat v2.0.
The v2.0 API is presented side-by-side the v1.x API under the `/v2`
export. Deprecation warnings were added to v1.x APIs that are removed or
changing in v2.0. An adapter to run v2 components inside a v1.7 component
is provided to help with component at a time migrations.

# Compatibility Overview

At the highest level there are few main compatibility breaks and most of
the rest of the changes are either features from the new API or
downstream compatibility breaks.

- `ComponentContext` has been renamed to `jsx.Mat`
- The top-level `jsx` import is now _type only_
- The runtime `jsx` function may be destructured from `jsx.Mat`

In v2 the `ComponentContext` is more important than ever and a shorter,
faster name to type seemed like a good idea. A lot of new power in v2
comes from the `jsx` runtime function being far more contextual and so
is provided by the new `jsx.Mat` component context parameter.
