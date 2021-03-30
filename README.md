## Highway
[![npm](https://img.shields.io/npm/v/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![npm](https://img.shields.io/npm/dt/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![GitHub issues](https://img.shields.io/github/issues-raw/Dogstudio/highway.svg)](https://github.com/Dogstudio/highway/issues)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@dogstudio/highway?label=bundle%20size)](https://bundlephobia.com/result?p=@dogstudio/highway)
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
- :bug: Fix [#77](https://github.com/Dogstudio/Highway/issues/77)

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


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/Anthodpnt"><img src="https://avatars3.githubusercontent.com/u/6245705?v=4" width="100px;" alt=""/><br /><sub><b>Anthony Du Pont</b></sub></a><br /><a href="#question-Anthodpnt" title="Answering Questions">💬</a> <a href="https://github.com/Dogstudio/highway/commits?author=Anthodpnt" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/commits?author=Anthodpnt" title="Documentation">📖</a><br /> <a href="#ideas-Anthodpnt" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-Anthodpnt" title="Maintenance">🚧</a> <a href="https://github.com/Dogstudio/highway/pulls?q=is%3Apr+reviewed-by%3AAnthodpnt" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/ThaoD5"><img src="https://avatars3.githubusercontent.com/u/10233610?v=4" width="100px;" alt=""/><br /><sub><b>ThaoD5</b></sub></a><br /><a href="#question-ThaoD5" title="Answering Questions">💬</a> <a href="https://github.com/Dogstudio/highway/commits?author=ThaoD5" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/commits?author=ThaoD5" title="Documentation">📖</a><br /> <a href="#ideas-ThaoD5" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-ThaoD5" title="Maintenance">🚧</a> <a href="https://github.com/Dogstudio/highway/pulls?q=is%3Apr+reviewed-by%3AThaoD5" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://twitter.com/joshgkirk"><img src="https://avatars1.githubusercontent.com/u/28448851?v=4" width="100px;" alt=""/><br /><sub><b>Josh Kirk</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=joshgkirk" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/commits?author=joshgkirk" title="Documentation">📖</a> <a href="#ideas-joshgkirk" title="Ideas, Planning, & Feedback">🤔</a><br /> <a href="#maintenance-joshgkirk" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://selfaware.studio"><img src="https://avatars2.githubusercontent.com/u/12376535?v=4" width="100px;" alt=""/><br /><sub><b>Mike Wagz</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=mikehwagz" title="Documentation">📖</a> <a href="#infra-mikehwagz" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a><br /><br /></td>
    <td align="center"><a href="https://twitter.com/suyashpurwar06"><img src="https://avatars1.githubusercontent.com/u/33785844?v=4" width="100px;" alt=""/><br /><sub><b>Suyash Purwar</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=Suyash-Purwar" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/issues?q=author%3ASuyash-Purwar" title="Bug reports">🐛</a><br /><br /></td>
    <td align="center"><a href="http://davidelanfranchi.com"><img src="https://avatars1.githubusercontent.com/u/13507672?v=4" width="100px;" alt=""/><br /><sub><b>Davide Lanfranchi</b></sub></a><br /><a href="#content-davidelanfranchi" title="Content">🖋</a><br /><br /></td>
    <td align="center"><a href="http://www.fabioquarantini.com"><img src="https://avatars3.githubusercontent.com/u/425733?v=4" width="100px;" alt=""/><br /><sub><b>Fabio Quarantini</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=fabioquarantini" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/issues?q=author%3Afabioquarantini" title="Bug reports">🐛</a><br /><br /></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.quentinneyraud.fr"><img src="https://avatars2.githubusercontent.com/u/9378568?v=4" width="100px;" alt=""/><br /><sub><b>Quentin Neyraud</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=quentinneyraud" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/issues?q=author%3Aquentinneyraud" title="Bug reports">🐛</a><br /><br /></td>
    <td align="center"><a href="https://sleepy.im"><img src="https://avatars0.githubusercontent.com/u/5907357?v=4" width="100px;" alt=""/><br /><sub><b>Harvey Zack</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=zhw2590582" title="Code">💻</a><br /><br /></td>
    <td align="center"><a href="https://stuur.men"><img src="https://avatars1.githubusercontent.com/u/1932851?v=4" width="100px;" alt=""/><br /><sub><b>Stijn de Jong</b></sub></a><br /><a href="https://github.com/Dogstudio/highway/commits?author=deJong" title="Code">💻</a> <a href="https://github.com/Dogstudio/highway/issues?q=author%3AdeJong" title="Bug reports">🐛</a><br /><br /></td>
  </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

See the [**LICENSE**](https://github.com/Dogstudio/highway/blob/master/LICENSE) file for license rights and limitations (MIT).
