// Builds links that work under the GitHub Pages sub-folder (/portfolio/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '/') => base + (path.startsWith('/') ? path : '/' + path);
