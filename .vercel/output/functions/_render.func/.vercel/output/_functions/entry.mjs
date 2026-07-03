import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_pXY8d00h.mjs';
import { manifest } from './manifest_DGz_irV7.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/raffles/save.astro.mjs');
const _page2 = () => import('./pages/history.astro.mjs');
const _page3 = () => import('./pages/login.astro.mjs');
const _page4 = () => import('./pages/logout.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.19_rollup@4.62.2_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/raffles/save.js", _page1],
    ["src/pages/history.astro", _page2],
    ["src/pages/login.astro", _page3],
    ["src/pages/logout.js", _page4],
    ["src/pages/index.astro", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "47f96673-6bd5-4a5a-bcf4-4b3ae49a3ae0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
