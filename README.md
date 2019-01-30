# mithril-json-viewer

Collapsable JSON viewer for mithril.js

## Description

This package renders a JSON object in an interactive way, allowing user to expand/collapse each nested tree node.

You can view an example [here](https://hungry-raman-deb8e1.netlify.com/).

![Sample Image](https://raw.githubusercontent.com/highmountaintea/mithril-json-viewer/master/docs/sample-tree.png)

## Usage

* requires mithril.js `npm install mithril` (mithril 1.x) or `npm install mithril@next` (mithril 2.x-rc)
* Install this package:
  * if you are using mithril 1.x, do: `npm install mithril-json-viewer`
  * if you are using mithril 2.x-rc, do: `npm install mithril-json-viewer@next`

Sample usage:
```js
import * as m from 'mithril';
import { JsonViewer } from 'mithril-json-viewer/es';

const tree = {
  name: 'I am a tree',
  children: [
    { name: 'I am child 1' },
    { name: 'I am child 2' },
    {
      name: 'I am child 3',
      children: ['grand child 1']
    },
  ],
  nested: {
    opt1: true,
    opt2: [1, 'a'],
    opt5: { a: 1, b: 2 },
  },
};

function view() {
  return m('div', { class: 'json-tree',  style: 'font-family: Courier;' },
    m(JsonViewer, { tree: tree, options: { collapseAfter: 1 } }),
  );
}

m.mount(document.body, { view: view });
```

You need some CSS to make the indentation work:
```css
.json-tree div {
  margin-left: 20px;
}

.json-tree button {
  font-size: 50%;
}
```
