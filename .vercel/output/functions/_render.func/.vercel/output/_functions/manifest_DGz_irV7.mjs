import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C-mtY2Je.mjs';
import 'es-module-lexer';
import { f as decodeKey } from './chunks/astro/server_CLj4HxU-.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jonathanleivag/Development/jonathanleivag/rifa-editor/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.16.19_rollup@4.62.2_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/raffles/save","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/raffles\\/save\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"raffles","dynamic":false,"spread":false}],[{"content":"save","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/raffles/save.js","pathname":"/api/raffles/save","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/history.D0CkUoMj.css"}],"routeData":{"route":"/history","isIndex":false,"type":"page","pattern":"^\\/history\\/?$","segments":[[{"content":"history","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/history.astro","pathname":"/history","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":":root{--bg-dark: #0a0f0d;--card-bg: rgba(255, 255, 255, .03);--border-color: rgba(255, 255, 255, .08);--text-light: #f3f4f6;--text-gray: #9ca3af;--accent: #4b5d4a;--accent-hover: #3d4c3c}[data-astro-cid-sgpqyurt]{box-sizing:border-box;margin:0;padding:0}body{font-family:Outfit,sans-serif;background:var(--bg-dark);background-image:radial-gradient(at 10% 20%,rgba(75,93,74,.15) 0px,transparent 50%),radial-gradient(at 90% 80%,rgba(44,90,69,.12) 0px,transparent 50%);color:var(--text-light);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.login-container[data-astro-cid-sgpqyurt]{background:var(--card-bg);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--border-color);border-radius:16px;width:100%;max-width:440px;padding:40px 30px;box-shadow:0 20px 40px #00000080;animation:fadeIn .6s cubic-bezier(.16,1,.3,1)}@keyframes fadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.header[data-astro-cid-sgpqyurt]{text-align:center;margin-bottom:30px;display:flex;flex-direction:column;align-items:center}.header[data-astro-cid-sgpqyurt] img[data-astro-cid-sgpqyurt]{width:80px;height:80px;border-radius:50%;border:2px solid var(--accent);margin-bottom:16px;object-fit:cover;box-shadow:0 4px 12px #0000004d}.header[data-astro-cid-sgpqyurt] h1[data-astro-cid-sgpqyurt]{font-size:28px;font-weight:800;letter-spacing:1px;background:linear-gradient(135deg,#f3f4f6 30%,#4b5d4a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}.header[data-astro-cid-sgpqyurt] p[data-astro-cid-sgpqyurt]{color:var(--text-gray);font-size:14px}.tabs[data-astro-cid-sgpqyurt]{display:flex;background:#ffffff05;border:1px solid var(--border-color);border-radius:8px;padding:4px;margin-bottom:25px}.tab-btn[data-astro-cid-sgpqyurt]{flex:1;background:none;border:none;color:var(--text-gray);padding:10px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;border-radius:6px;transition:all .2s}.tab-btn[data-astro-cid-sgpqyurt].active{background:var(--accent);color:var(--text-light)}.alert[data-astro-cid-sgpqyurt]{background:#ef44441a;border:1px solid rgba(239,68,68,.2);color:#ef4444;padding:12px 16px;border-radius:8px;font-size:13.5px;margin-bottom:20px;display:flex;align-items:center;gap:8px}.form-group[data-astro-cid-sgpqyurt]{margin-bottom:20px;display:flex;flex-direction:column;gap:8px}.form-group[data-astro-cid-sgpqyurt] label[data-astro-cid-sgpqyurt]{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-gray)}.form-group[data-astro-cid-sgpqyurt] input[data-astro-cid-sgpqyurt]{background:#ffffff0a;border:1px solid var(--border-color);border-radius:8px;padding:12px 16px;font-family:inherit;font-size:15px;color:var(--text-light);transition:all .2s}.form-group[data-astro-cid-sgpqyurt] input[data-astro-cid-sgpqyurt]:focus{outline:none;border-color:var(--accent);background:#ffffff14;box-shadow:0 0 0 3px #4b5d4a33}.submit-btn[data-astro-cid-sgpqyurt]{width:100%;background:var(--accent);border:none;border-radius:8px;color:var(--text-light);padding:14px;font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s;margin-top:10px;box-shadow:0 4px 12px #4b5d4a33}.submit-btn[data-astro-cid-sgpqyurt]:hover{background:var(--accent-hover);transform:translateY(-1px)}.submit-btn[data-astro-cid-sgpqyurt]:active{transform:translateY(1px)}\n"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/logout","isIndex":false,"type":"endpoint","pattern":"^\\/logout\\/?$","segments":[[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logout.js","pathname":"/logout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.bnq3-_zG.js"}],"styles":[{"type":"external","src":"/_astro/index.eqsVkDIA.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/history.astro",{"propagation":"none","containsHead":true}],["/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/login.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/raffles/save@_@js":"pages/api/raffles/save.astro.mjs","\u0000@astro-page:src/pages/history@_@astro":"pages/history.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/logout@_@js":"pages/logout.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.16.19_rollup@4.62.2_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/node_modules/.pnpm/astro@4.16.19_rollup@4.62.2_typescript@5.9.3/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DGz_irV7.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.bnq3-_zG.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/history.D0CkUoMj.css","/_astro/index.eqsVkDIA.css","/favicon.jpg","/logo.jpg","/raffle_bg_1.jpg","/raffle_bg_2.jpg","/raffle_bg_3.jpg","/raffle_bg_4.jpg","/raffle_bg_5.jpg","/_astro/hoisted.bnq3-_zG.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"Cjy5o7/Jdbez0kqvYMLIH4G5DISHtiuUH5lG+jVv5Aw=","experimentalEnvGetSecretEnabled":false});

export { manifest };
