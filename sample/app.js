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
  return m('div', { class: 'json-tree' },
    m(JsonViewer, { tree: tree, options: { collapseAfter: 1 } }),
  );
}

m.mount(document.body, { view: view });
