<p align="center">
  <a href="https://zhourengui.github.io/dugu-defeat">
    <img width="200" src="./images/icon.jpeg" style="border-radius: 50%">
  </a>
</p>

<h1 align="center">Dugu Defeat</h1>

<div align="center">

An Custom UI design language and React UI library.

[![CI status][github-action-image]][github-action-url] [![NPM version][npm-image]][npm-url]

[![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url] [![][bundlesize-js-image]][unpkg-js-url] [![][bundlesize-css-image]][unpkg-css-url]

[![Issues need help][help-wanted-image]][help-wanted-url]

[npm-image]: http://img.shields.io/npm/v/dugu-defeat.svg?style=flat-square
[npm-url]: http://npmjs.org/package/dugu-defeat
[github-action-image]: https://github.com/ant-design/ant-design/workflows/%E2%9C%85%20test/badge.svg
[github-action-url]: https://github.com/zhourengui/dugu-defeat/actions?query=workflow%3A%22%E2%9C%85+test%22
[david-image]: https://img.shields.io/david/zhourengui/dugu-defeat?style=flat-square
[david-dev-url]: https://david-dm.org/zhourengui/dugu-defeat?type=dev
[david-dev-image]: https://img.shields.io/david/dev/ant-design/ant-design?style=flat-square
[david-url]: https://david-dm.org/zhourengui/dugu-defeat
[help-wanted-image]: https://flat.badgen.net/github/label-issues/ant-design/ant-design/help%20wanted/open
[help-wanted-url]: https://github.com/zhourengui/dugu-defeat/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22
[bundlesize-js-image]: https://img.badgesize.io/https:/unpkg.com/dugu-defeat/dist/index.js?label=index.js&compression=gzip&style=flat-square
[bundlesize-css-image]: https://img.badgesize.io/https:/unpkg.com/dugu-defeat/dist/index.css?label=index.css&compression=gzip&style=flat-square
[unpkg-js-url]: https://unpkg.com/browse/dugu-defeat/dist/index.js
[unpkg-css-url]: https://unpkg.com/browse/dugu-defeat/dist/index.css

</div>

## ✨ Features

- 🌈 Custom UI designed for web applications.
- 📦 A set of high-quality React components out of the box.
- 🛡 Written in TypeScript with predictable static types.

## 🖥 Environment Support

- Modern browsers and Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
- Server-side Rendering

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| IE11, Edge                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                              |     |

## 📦 Install

```bash
npm install dugu-defeat
```

```bash
yarn add dugu-defeat
```

## 🔨 Usage

```jsx
import { Button, DatePicker } from "dugu-defeat";

const App = () => (
  <>
    <Button type="primary">Concat Me</Button>
  </>
);
```

And import style manually:

```jsx
import "dugu-defeat/dist/index.css";
```

### TypeScript

`antd` is written in TypeScript with complete definitions, check [Use in TypeScript](https://ant.design/docs/react/use-in-typescript) to getting started.

## ⌨️ Development

Use Gitpod, a free online dev environment for GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/zhourengui/dugu-defeat)

Or clone locally:

```bash
$ git clone https://github.com/zhourengui/dugu-defeat.git
$ cd dugu-defeat
$ yarn install
$ yarn storybook
```

Open your browser and visit http://127.0.0.1:6006 , see more at [Development](https://github.com/zhourengui/dugu-defeat/wiki/Development).
