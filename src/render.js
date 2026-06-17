function el(tag, { classes, id, attribute, text, children, on } = {}) {
  const node = document.createElement(tag);
  if (id) node.id = id;
  if (text) node.textContent = text;
  if (classes) {
    const list = Array.isArray(classes) ? classes : [classes];
    node.classList.add(...list);
  }
  if (attribute) Object.entries(attribute).forEach(([k, v]) => (node[k] = v));
  if (on) Object.entries(on).forEach(([e, fn]) => node.addEventListener(e, fn));
  if (children) node.append(...children);
  return node;
}

export function qs(selector, { classes, removeClasses, text, attribute } = {}) {
  const node = document.querySelector(selector);
  if (!node) throw new Error(`qs: no element found for "${selector}"`);
  if (text) node.textContent = text;
  if (classes) {
    const list = Array.isArray(classes) ? classes : [classes];
    node.classList.add(...list);
  }
  if (removeClasses) {
    const list = Array.isArray(removeClasses) ? removeClasses : [removeClasses];
    node.classList.remove(...list);
  }
  if (attribute) Object.entries(attribute).forEach(([k, v]) => (node[k] = v));
  return node;
}
function field({ labelFor, labelText, fieldClass, input }) {
  const wrapper = el('div', { classes: [fieldClass] });
  const label = el('label', {
    attribute: { htmlFor: labelFor },
    text: labelText,
  });
  return wrapper.append(label, input);
}

function createSVGEl(tag, attrs) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}
