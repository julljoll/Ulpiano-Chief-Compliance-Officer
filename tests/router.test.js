import assert from 'node:assert/strict';
import test from 'node:test';

class Element {
  constructor(attributes = {}) {
    this.attributes = new Map(Object.entries(attributes));
    this.style = {};
    this.classNames = new Set();
    this.classList = {
      toggle: (name, force) => {
        if (force) this.classNames.add(name);
        else this.classNames.delete(name);
        return force;
      },
      contains: (name) => this.classNames.has(name),
    };
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
  }
  removeAttribute(name) {
    this.attributes.delete(name);
  }
}

const routeNames = ['dashboard', 'diagrams', 'api', 'reader', 'compare', 'matrix'];
const views = new Map(routeNames.map((name) => [`view-${name}`, new Element()]));
const tabs = routeNames.map((name) => new Element({ 'data-view': name }));
const listeners = new Map();
globalThis.document = {
  title: '',
  querySelectorAll: (selector) => (selector === '.dc3-nav-tab' ? tabs : []),
  getElementById: (id) => views.get(id) ?? null,
};
globalThis.window = {
  location: { hash: '' },
  addEventListener: (name, callback) => listeners.set(name, callback),
  scrollTo() {},
};
globalThis.history = {
  state: null,
  pushState(state, _title, url) {
    this.state = state;
    window.location.hash = new URL(url, 'https://example.test').hash;
  },
};

const router = await import('../src/modules/router.js');
const { state } = await import('../src/modules/state.js');

test('all six hash routes activate the matching tab and view', () => {
  for (const name of routeNames) {
    router.switchView(name);
    assert.equal(window.location.hash, `#${name}`);
    assert.equal(views.get(`view-${name}`).getAttribute('hidden'), null);
    assert.equal(
      tabs.find((tab) => tab.getAttribute('data-view') === name).getAttribute('aria-selected'),
      'true'
    );

    for (const other of routeNames.filter((route) => route !== name)) {
      assert.equal(views.get(`view-${other}`).getAttribute('hidden'), '');
      assert.equal(
        tabs.find((tab) => tab.getAttribute('data-view') === other).getAttribute('aria-selected'),
        'false'
      );
    }
  }
});

test('initial hash and browser back/forward restore known views', () => {
  window.location.hash = '#compare';
  assert.equal(router.initFromHash(), true);
  assert.equal(state.currentView, 'compare');

  window.location.hash = '#reader';
  listeners.get('popstate')({ state: null });
  assert.equal(state.currentView, 'reader');

  window.location.hash = '#unknown';
  assert.equal(router.initFromHash(), false);
});
