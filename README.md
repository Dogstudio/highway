## Highway

[![npm](https://img.shields.io/npm/v/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![npm](https://img.shields.io/npm/dt/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![GitHub issues](https://img.shields.io/github/issues-raw/Dogstudio/highway.svg)](https://github.com/Dogstudio/highway/issues)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@dogstudio/highway/2.2.1?label=bundle%20size)](https://bundlephobia.com/result?p=@dogstudio/highway@2.2.1)
![NpmLicense](https://img.shields.io/npm/l/@dogstudio/highway.svg)


<p align="center"><img src="https://i.imgur.com/SNk3YwV.png" alt="Banner" /></p>

**Highway** is a *lightweight* (**2.5ko** compressed & gzipped), *robust*, *modern* and *flexible* library that will let us create **AJAX navigations** with beautiful **transitions** on our websites. It's been a while we were trying to build this kind of library to fits our needs at [**Dogstudio**](https://www.dogstudio.co) and we now finally released it!

<p align="center"><a href="https://join.slack.com/t/highway-lib/shared_invite/zt-60jkz5kh-defbgkYYTclu609sUAEN3Q"target="_blank"><img src="https://i.imgur.com/4nWCfju.png" alt="Banner" /></a></p>

## Table of Content

- [**Guide**](https://dogstudio.github.io/highway/)
- [**Support**](https://github.com/Dogstudio/highway#browser-support)
- [**Roadmap**](https://github.com/Dogstudio/highway#roadmap)
- [**Releases**](https://github.com/Dogstudio/highway#releases)
- [**License**](https://github.com/Dogstudio/highway#license)

## Browser Support

Highway is supported by **all recent major versions** of the following modern browsers.

- Google Chrome
- Firefox
- Edge
- Safari

### With polyfills
Older browsers or versions can be supported by Highway by combining it with **polyfills**. Please follow [**this example**](https://highway.js.org/examples/polyfills.html) to have more information. Once the polyfills are configured, Highway should be working on **most of the browsers and versions**. However, be aware that the **oldest browsers or versions** might still be unsupported. So, be reasonable before opening an issue...</p>

- Google Chrome
- Firefox
- Edge
- Safari
- Internet Explorer 11

## Roadmap

- [ ] More Unit Tests
- [ ] More Examples
- [ ] More Demos

## Releases
#### 2.2.x

- :lock: Update dependencies for security purposes
- :tada: Add new websites in the *Hall of Fame*
- :tada: Add [Polyfills](https://highway.js.org/examples/polyfills.html) example to documentation
- :sparkles: Reduce bundle size significantly with [microbundle](https://github.com/developit/microbundle)
- :art: Update browser support in documentation
- :art: Update browser support in README.md
- :bug: Fix Slack URL in documentation
- :bug: Fix Slack URL in README.md

#### 2.1.x

- :lock: Update dependencies for security purposes
- :tada: Add `trigger` information in transitions and events
- :tada: Add contextual transitions
- :tada: Add overlapping transitions
- :sparkles: Add [Prefetch](https://highway.js.org/examples/prefetch.html) example to documentation
- :sparkles: Improve transitions and events parameters for destructuring
- :sparkles: Improve [documentation website](https://highway.js.org)
- :sparkles: Improve `Core.redirect(href, transition)` method
- :sparkles: Improve `Core.attach(links)` method
- :sparkles: Improve `Core.detach(links)` method
- :art: Invert `from` and `to` parameters of the `NAVIGATE_END` event
- :bug: Fix [issue #44](https://github.com/Dogstudio/highway/issues/44)

#### 2.0.x

- :tada: Add [documentation website](https://highway.js.org)
- :tada: Add `Core.redirect(href)` method
- :tada: Add dynamic import for renderers
- :art: Update informations sent with events
- :art: Rename `Core.bind()` into `Core.attach()`
- :art: Rename `Core.unbind()` into `Core.dettach()`
- :art: Rename `Renderer.root` into `Renderer.view`
- :art: Replace `Renderer.page` by `Renderer.properties`
- :bug: Fix pushState location in the process
- :bug: Fix CMD/CTRL + click behavior of browsers
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
- [ThaoD5](https://twitter.com/ThaoD5)
- [joshkirk-zero](https://twitter.com/joshgkirk)
- [mike_wagz](https://twitter.com/mike_wagz)

## License

See the [**LICENSE**](https://github.com/Dogstudio/highway/blob/master/LICENSE) file for license rights and limitations (MIT).
