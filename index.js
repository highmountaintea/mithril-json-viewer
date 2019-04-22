var m = require('mithril').m;

function renderCollapsed(propStr, isArray, pathStr, statusLookup) {
  return m('div', [
    '' + propStr + (isArray ? '[' : '{'),
    m('button', {
      onclick: function () { statusLookup[pathStr] = false; },
    }, '...'),
    (isArray ? ']' : '}'),
  ]);
}

function renderExpanded(propStr, tree, paths, isArray, pathStr, statusLookup, collapseAfter) {
  var divs = [];
  divs.push('' + propStr + (isArray ? '[' : '{'));
  divs.push(
    m('button', {
      onclick: function () { statusLookup[pathStr] = true; },
    }, '-')
  );
  for (var key in tree) {
    if (!tree.hasOwnProperty(key)) continue;
    var child = tree[key];
    var newpath = paths.slice();
    newpath.push(key);
    divs.push(renderTree(key, child, newpath, statusLookup, collapseAfter));
  }
  divs.push((isArray ? ']' : '}'));
  return m('div', divs);
}

function renderTree(prop, tree, paths, statusLookup, collapseAfter) {
  var propStr = prop == null ? '' : prop + ':';
  var pathStr = JSON.stringify(paths);
  var collapsed = statusLookup[pathStr];
  if (collapsed == null) {
    if (paths.length > collapseAfter) collapsed = true;
    else collapsed = false;
  }
  if (tree != null && tree instanceof Array) {
    if (collapsed) return renderCollapsed(propStr, true, pathStr, statusLookup);
    else return renderExpanded(propStr, tree, paths, true, pathStr, statusLookup, collapseAfter);
  }
  if (tree != null && typeof tree === 'object') {
    if (collapsed) return renderCollapsed(propStr, false, pathStr, statusLookup);
    else return renderExpanded(propStr, tree, paths, false, pathStr, statusLookup, collapseAfter);
  }
  return m('div', propStr + JSON.stringify(tree));
}

module.exports = function JsonViewer(initialVnode) {
  var attrs = initialVnode.attrs;
  var options = attrs.options || {};
  var statusLookup = {};

  return {
    view: function(vnode) {
      var tree = vnode.attrs.tree;
      return renderTree(null, tree, [], statusLookup, options.collapseAfter);
    }
  };
};

