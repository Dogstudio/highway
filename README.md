## Highway

[![npm](https://img.shields.io/npm/v/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![npm](https://img.shields.io/npm/dt/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![Gzip Size](https://img.badgesize.io/https://unpkg.com/@dogstudio/highway@1.3.4/dist/highway.min.js?compression=gzip)](https://unpkg.com/@dogstudio/highway@1.3.4/dist/highway.min.js)
[![GitHub issues](https://img.shields.io/github/issues-raw/Dogstudio/highway.svg)](https://github.com/Dogstudio/highway/issues)

<p align="center"><img src="https://i.imgur.com/SNk3YwV.png" alt="Banner" /></p>

**Highway** is a *lightweight (**2.2ko** gzipped)*, *robust*, *modern* and *flexible* library that will let us create **AJAX navigations** with beautiful **transitions** on our websites. It's been a while we were trying to build this kind of library to fits our needs at [**Dogstudio**](https://www.dogstudio.co) and we now finally released it!

## Table of Content

- [**Guide**](https://dogstudio.github.io/highway/)
- [**Examples**](https://dogstudio.github.io/highway/examples.html)
- [**Demos**](https://dogstudio.github.io/highway/demos.html)
- [**Support**](https://github.com/Dogstudio/highway#support)
- [**Roadmap**](https://github.com/Dogstudio/highway#roadmap)
- [**Releases**](https://github.com/Dogstudio/highway#releases)
- [**License**](https://github.com/Dogstudio/highway#license)

## Support

- Google Chrome
- Firefox
- Edge
- Safari 6.2+
- Internet Explorer 10+ (+ [**whatwg-fetch**](https://github.com/github/fetch))

## Roadmap

- [ ] More Unit Tests
- [ ] More Examples
- [ ] More Demos

## Releases
#### 2.0.x

- :tada: Add [demo website](https://dogstudio.github.io/highway/)
- :tada: Add `Core.redirect(href)` method
- :tada: Add dynamic import for renderers
- :art: Update informations sent with events
- :art: Rename `Core.bind()` into `Core.attach()`
- :art: Rename `Core.unbind()` into `Core.dettach()`
- :art: Rename `Renderer.root` into `Renderer.view`
- :art: Replace `Renderer.page` by `Renderer.properties`
- :bug: Fix `NAVIGATE_IN` event that was fired too early
- :bug: Fix the view swapping that causes so issues
- :bug: Fix page caching with queries
- :bug: Fix [issue #9](https://github.com/Dogstudio/highway/issues/9)
- :bug: Fix [issue #12](https://github.com/Dogstudio/highway/issues/12)
- :sparkles: Improve overall code
- :fire: Remove `NAVIGATE_ERROR` event
- :fire: Clean up README.md

#### 1.3.x

- :tada: Add ES5 version in `dist/es5` folder
- :tada: Add the `Basic Anchor` example
- :tada: Add the `Basic Polyfill` example
- :tada: Add unit tests
- :fire: Remove **modes** that weren't convincing
- :sparkles: Improve code and weight with ES2016+ features
- :sparkles: Improve events
- :sparkles: Improve transitions
- :sparkles: Improve documentation
- :art: Rename renderers `init` method to `setup` method
- :bug: Quick fix for URLs with parameters
- :bug: Fix events
- :bug: Fix helpers
- :bug: Skip link with `javascript:` in `href`

#### 1.2.x

- :tada: Add `NAVIGATE_CALL`, `NAVIGATE_IN`, `NAVIGATE_OUT` events
- :tada: Add more variables available in `Highway.Renderer`
- :sparkles: Improve renderers
- :sparkles: Improve documentation

#### 1.1.x

- :tada: Add **modes**
- :sparkles: Improve documentation

#### 1.0.x

- :tada: Add `Highway.Transition`

#### 0.0.x

- :rocket: First release

## Contributors

- [Anthodpnt](https://twitter.com/Anthodpnt)

## License

See the [**LICENSE**](https://github.com/Dogstudio/highway/blob/master/LICENSE) file for license rights and limitations (MIT).
