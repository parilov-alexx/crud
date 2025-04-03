const url = new URL(window.location.href);

if (url.hostname === 'localhost') {
  url.port = '7777';
}

const root = url;
root.pathname = '';

const link = {
  root: root.origin,
  notes: new URL('notes', url.href).href,
};

export default link;