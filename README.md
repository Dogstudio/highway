## Highway

[![Travis](https://img.shields.io/travis/Dogstudio/highway.svg)](https://travis-ci.org/Dogstudio/highway)
[![npm](https://img.shields.io/npm/v/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![npm](https://img.shields.io/npm/dt/@dogstudio/highway.svg)](https://www.npmjs.com/package/@dogstudio/highway)
[![Coveralls github](https://img.shields.io/coveralls/github/Dogstudio/highway.svg)](https://coveralls.io/github/Dogstudio/highway)
[![GitHub issues](https://img.shields.io/github/issues-raw/Dogstudio/highway.svg)](https://github.com/Dogstudio/highway/issues)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Dogstudio/highway/issues)
[![license](https://img.shields.io/github/license/Dogstudio/highway.svg)](https://github.com/Dogstudio/highway/blob/master/LICENSE)


<p align="center"><img src="https://i.imgur.com/AOEVomM.png" alt="Banner" /></p>

**Highway** is a *modern*, *flexible* and *lightweight* library that will let you create **AJAX navigations** with beautiful **transitions** on your websites. It's been a while we were trying to build this kind of library to fits our needs at [**Dogstudio**](https://www.dogstudio.co) and that hopefully will fit yours now we're releasing it!

## Installation

You can install Highway the way you want between these two methods:

**With YARN:**
```
yarn add @dogstudio/highway
```

**With NPM:**
```
npm install --save @dogstudio/highway
```

## Usage

Now you have installed Highway it's time to dive into how you can now use it... And you know what? It's pretty simple.  
First let's *import* Highway:

```javascript
import Highway from '@dogstudio/highway';
```
or *require* it if you prefer:
```javascript
const Highway = require('@dogstudio/highway');
```
Now Highway is available you need to create an instance of `Highway.Core` and give it your [**renderers**]() and [**transitions**]().
```javascript
const H = new Highway.Core({
  renderers: {
    [...]
  },
  transitions: {
    [...]
  }
});
```
**And voilà**!  
You are now ready to create some beautiful and creative transitions between your pages.

## Examples

- [Basic Setup](https://github.com/Dogstudio/highway/tree/master/examples/basic-setup)
- [Basic Transition](https://github.com/Dogstudio/highway/tree/master/examples/basic-transition)
- [Basic CSS Transition](https://github.com/Dogstudio/highway/tree/master/examples/basic-css-transition)
- [Basic Menu Active](https://github.com/Dogstudio/highway/tree/master/examples/basic-menu-active)
- [Basic Google Analytics Events](https://github.com/Dogstudio/highway/tree/master/examples/basic-google-analytics)

## Roadmap

- [ ] Documentation
- [ ] Github Page
- [ ] More Unit Tests
- [ ] More Examples

## License

See the [LICENSE](https://github.com/Dogstudio/highway/blob/master/LICENSE) file for license rights and limitations (MIT).
