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

## Table of Content

- [**Installation**](https://github.com/Dogstudio/highway#installation)
- [**Usage**](https://github.com/Dogstudio/highway#usage)
- [**Renderers**](https://github.com/Dogstudio/highway#renderers)
- [**Transitions**](https://github.com/Dogstudio/highway#transitions)
- [**Events**](https://github.com/Dogstudio/highway#events)
- [**Examples**](https://github.com/Dogstudio/highway#examples)
- [**Roadmap**](https://github.com/Dogstudio/highway#roadmap)
- [**Releases**](https://github.com/Dogstudio/highway#releases)
- [**License**](https://github.com/Dogstudio/highway#license)

## Installation

You can install **Highway** the way you want between these two methods:

**With YARN:**
```
yarn add @dogstudio/highway
```

**With NPM:**
```
npm install --save @dogstudio/highway
```

## Usage

Now you have installed **Highway** it's time to dive into how you can use it... And you know what? It's pretty simple.  
First let's *import* **Highway**:

```javascript
import Highway from '@dogstudio/highway';
```
or *require* it if you prefer:
```javascript
const Highway = require('@dogstudio/highway');
```

Now **Highway** is available you need to create an instance of `Highway.Core` and give it your [**renderers**](https://github.com/Dogstudio/highway#renderers) and [**transitions**](https://github.com/Dogstudio/highway#transitions).

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

Finally, in order to work properly **Highway** needs a basic HTML structure. All you have to do is to put somewhere in your pages the `router-wrapper` that will contain and **only** contain the `router-view`. You need to understand that **Highway** will only change the `router-view` presents in the `router-wrapper`. Everything outside of the `router-wrapper` will stay the same all along the user's navigation.

```html
<!-- [...] -->
<body>
  <!-- [...] -->
  <main router-wrapper>
    <article router-view>
      <!-- [...] -->
    </article>
  </main>
  <!-- [...] -->
</body>
<!-- [...] -->
```

**And voilà**!  
You are now ready to create some beautiful and creative transitions between your pages.

## Renderers

Everytime you create a page that needs its own Javascript to work you need to relate it to a custom **renderer**. This way **Highway** will be able to call the page's Javascript during the transition. Luckily we have done **almost** all the work for you, great isn't it? However you have a part to play in this and here is how you can setup properly your custom renderers.

**Note:** If your page doesn't have any Javascript related to it you don't need to create a custom renderer for it.

### HTML

About your HTML this is actually pretty simple... Remember the `router-view` you added to your DOM? You are going to name it and the name you are going to give to your `router-view` will be used later to identify it and relate it to the correct custom renderer in Javascript.

**index.html**
```html
<!-- [...] -->
<body>
  <!-- [...] -->
  <main router-wrapper>
    <article router-view="home">
      <!-- [...] -->
    </article>
  </main>
  <!-- [...] -->
</body>
<!-- [...] -->
```

### Javascript

On the Javascript-side it's again pretty simple... What you need to do is to create a custom renderer for your page that will extend `Highway.Renderer` and enable all the required methods in order to make you custom renderer work.

**home.js**
```javascript
// Import Highway
import Highway from '@dogstudio/highway';

class Home extends Highway.Renderer {
  [...]
}

// Don`t forget to export your renderer
export default Home;
```

Besides the required methods from **Highway** present in the `Highway.Renderer` you have access to **optional** ones that are called all along the process of the navigation. Here is the list of these **optional** methods:

- `onEnter`: Called when the transition `in` starts & the `router-view` is added to `router-wrapper`.
- `onLeave`: Called when the transition `out` starts.
- `onEnterCompleted`: Called when the transition `in` is over.
- `onLeaveCompleted`: Called when the transition `out` is over & the `router-view` is removed from `router-wrapper`.

`Highway.Renderer` also gives you access to useful variables you will be able to use in your own code:

- `this.page`: The full DOM of the page related to the renderer.
- `this.view`: The `[router-view]` of the page related to the renderer.
- `this.title`: The `document.title` of the page related to the renderer.

**home.js**
```javascript
// Import Highway
import Highway from '@dogstudio/highway';

class Home extends Highway.Renderer {
  onEnter() { }
  onLeave() { }
  onEnterCompleted() { }
  onLeaveCompleted() { }
}

// Don`t forget to export your renderer
export default Home;
```

Now your custom renderer is created you need to add it to the renderers list of `Highway.Core`...  
Remember the name you gave to you `router-view`, it's now time to relate it to your custom renderer.

```javascript
// Import Renderers
import Home from 'path/to/home.js';

// Relate you renderer to your [router-view] name
const H = new Highway.Core({
  renderers: {
    home: Home
  },
  transitions: {
    [...]
  }
});
```

## Transitions

OK so now you have your custom renderers but you are sad because there are no transitions between your pages...  
Don't be afraid, let's now see how to create our first transition!

Transitions in **Highway** are really simple, you need to extend `Highway.Transition` and provide two required methods:

- `in`: The `in` method should contain the transition to show a `[router-view]`.
- `out`: The `out` method should contain the transition to hide a `[router-view]`.

Each one get two parameters you can call howewer you want but here are good defaults:

- `view`: The `[router-view]` you will show/hide.
- `done`: The callback method **you have to** call once the `in` and `out` transitions are over.

**transition.js**
```javascript
// Import Highway
import Highway from '@dogstudio/highway';

class Transition extends Highway.Transition {
  in(view, done) {
    // [...]
  }

  out(view, done) {
    // [...]
  }
}

// Don't forget to export your transition
export default Transition;
```

Now your transition is created you need to add it to the transitions list of `Highway.Core`...  
Remember the name you gave to you `router-view`, it's now time to relate it to your transition.

```javascript
// Import Renderers
import Home from 'path/to/home.js';

// Import Transitions
import Transition from 'path/to/transition.js';

// Relate you transition to your [router-view] name
const H = new Highway.Core({
  renderers: {
    home: Home
  },
  transitions: {
    home: Transition
  }
});
```

Finally you might want to use the same transition for all the pages across your website. This is possible by adding a `default` key to your transitions list. When you do so, for each page, **Highway** will look for a transition in the list related to your `router-view` name and fallback to the `default` one if none is found.

```javascript
// [...]
const H = new Highway.Core({
  renderers: {
    home: Home
  },
  transitions: {
    default: Transition
  }
});
```

Check out the [**examples**](https://github.com/Dogstudio/highway#examples) for more details about transitions in **Highway**.

## Events

Last but not least, **Highway** extends [**tiny-emitter**](https://github.com/scottcorgan/tiny-emitter) to send events along the navigation process you can listen to in order to extend its capabilities. There are three events available for you:

- `NAVIGATE_CALL`: Trigger right after a link or an history button of the browser is clicked.
- `NAVIGATE_START`: Trigger when a navigation starts.
- `NAVIGATE_END`: Trigger when a navigation ends.
- `NAVIGATE_IN`: Trigger when the `in` transition starts.
- `NAVIGATE_OUT`: Trigger when the `out` transition starts.
- `NAVIGATE_ERROR`: Trigger when an error occurs in navigation process.

All events except `NAVIGATE_CALL` and `NAVIGATE_ERROR` give you access to some parameters in this order:

- `from`: The renderer of the page you come from.
- `to`: The renderer of the page you go to.
- `state`: The state of **Highway** that contains all the informations about the URL of the page you go to.

```javascript
// [...]
H.on('NAVIGATE_CALL', () => {
  // [...]
});

H.on('NAVIGATE_START', (from, to, state) => {
  // [...]
});

H.on('NAVIGATE_OUT', (from, to, state) => {
  // [...]
});

H.on('NAVIGATE_IN', (from, to, state) => {
  // [...]
});

H.on('NAVIGATE_END', (from, to, state) => {
  // [...]
});

H.on('NAVIGATE_ERROR', () => {
  // [...]
});
// [...]
```

Check out the [**Basic Menu Active**](https://github.com/Dogstudio/highway/tree/master/examples/basic-menu-active) example for more details about events handling in **Highway**.

## Examples

- [**Basic Setup**](https://github.com/Dogstudio/highway/tree/master/examples/basic-setup)
- [**Basic Transition**](https://github.com/Dogstudio/highway/tree/master/examples/basic-transition)
- [**Basic CSS Transition**](https://github.com/Dogstudio/highway/tree/master/examples/basic-css-transition)
- [**Basic Menu Active**](https://github.com/Dogstudio/highway/tree/master/examples/basic-menu-active)
- [**Basic Google Analytics Events**](https://github.com/Dogstudio/highway/tree/master/examples/basic-google-analytics)

## Roadmap

- [ ] More Unit Tests
- [ ] More Examples

## Releases
#### 1.3.x

- Remove **modes** that weren't convincing
- Improve transitions

#### 1.2.x

- Add `NAVIGATE_CALL`, `NAVIGATE_IN`, `NAVIGATE_OUT` events
- Add more variables available in `Highway.Renderer`
- Improve renderers
- Improve documentation

#### 1.1.x

- Add **modes**
- Improve documentation

#### 1.0.x

- Add `Highway.Transition`

#### 0.0.x

- First release

## License

See the [**LICENSE**](https://github.com/Dogstudio/highway/blob/master/LICENSE) file for license rights and limitations (MIT).
