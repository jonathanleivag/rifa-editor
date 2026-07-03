import { c as createComponent, a as renderTemplate, e as defineScriptVars, b as addAttribute, r as renderHead, d as createAstro } from '../chunks/astro/server_CLj4HxU-.mjs';
import 'kleur/colors';
import 'clsx';
import { r as registerUser, l as loginUser } from '../chunks/auth_L9zmvvbl.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let errorMsg = "";
  let activeTab = "login";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const action = formData.get("action");
      const username = formData.get("username")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      activeTab = action?.toString() || "login";
      if (!username || !password) {
        throw new Error("Todos los campos son obligatorios");
      }
      if (action === "register") {
        const { token } = await registerUser(username, password);
        Astro2.cookies.set("session", token, { path: "/", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 });
        return Astro2.redirect("/");
      } else {
        const { token } = await loginUser(username, password);
        Astro2.cookies.set("session", token, { path: "/", httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7 });
        return Astro2.redirect("/");
      }
    } catch (err) {
      errorMsg = err.message || "Ocurri\xF3 un error inesperado";
    }
  }
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-sgpqyurt> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Acceso - Creador de Rifas</title><link rel="icon" type="image/jpeg" href="/favicon.jpg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">', '</head> <body data-astro-cid-sgpqyurt> <div class="login-container" data-astro-cid-sgpqyurt> <div class="header" data-astro-cid-sgpqyurt> <img src="/logo.jpg" alt="Rifa Editor Logo" data-astro-cid-sgpqyurt> <h1 data-astro-cid-sgpqyurt>RIFA EDITOR</h1> <p id="header-desc" data-astro-cid-sgpqyurt>Ingresa a tu cuenta para dise\xF1ar y gestionar tus rifas</p> </div> <div class="tabs" data-astro-cid-sgpqyurt> <button type="button" class="tab-btn" id="btn-tab-login" data-astro-cid-sgpqyurt>Acceder</button> <button type="button" class="tab-btn" id="btn-tab-register" data-astro-cid-sgpqyurt>Registrarse</button> </div> ', ' <form method="POST" id="auth-form" data-astro-cid-sgpqyurt> <input type="hidden" name="action" id="input-action"', ' data-astro-cid-sgpqyurt> <div class="form-group" data-astro-cid-sgpqyurt> <label for="username" data-astro-cid-sgpqyurt>Correo Electr\xF3nico</label> <input type="email" id="username" name="username" required autocomplete="email" placeholder="ejemplo@correo.com" data-astro-cid-sgpqyurt> </div> <div class="form-group" style="margin-bottom: 25px;" data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Contrase\xF1a</label> <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" data-astro-cid-sgpqyurt> </div> <button type="submit" class="submit-btn" id="submit-btn-text" data-astro-cid-sgpqyurt>Ingresar</button> </form> </div> <script>(function(){', "\n    const btnTabLogin = document.getElementById('btn-tab-login');\n    const btnTabRegister = document.getElementById('btn-tab-register');\n    const inputAction = document.getElementById('input-action');\n    const submitBtnText = document.getElementById('submit-btn-text');\n    const headerDesc = document.getElementById('header-desc');\n\n    function setTab(tab) {\n      if (tab === 'register') {\n        btnTabRegister.classList.add('active');\n        btnTabLogin.classList.remove('active');\n        inputAction.value = 'register';\n        submitBtnText.textContent = 'Registrarse';\n        headerDesc.textContent = 'Crea una cuenta nueva para comenzar a dise\xF1ar rifas';\n      } else {\n        btnTabLogin.classList.add('active');\n        btnTabRegister.classList.remove('active');\n        inputAction.value = 'login';\n        submitBtnText.textContent = 'Ingresar';\n        headerDesc.textContent = 'Ingresa a tu cuenta para dise\xF1ar y gestionar tus rifas';\n      }\n    }\n\n    btnTabLogin.addEventListener('click', () => setTab('login'));\n    btnTabRegister.addEventListener('click', () => setTab('register'));\n\n    // Initialize state\n    setTab(activeTab);\n  })();<\/script> </body> </html>"])), renderHead(), errorMsg && renderTemplate`<div class="alert" data-astro-cid-sgpqyurt> <svg style="width: 18px; height: 18px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sgpqyurt> <circle cx="12" cy="12" r="10" data-astro-cid-sgpqyurt></circle> <line x1="12" y1="8" x2="12" y2="12" data-astro-cid-sgpqyurt></line> <line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-sgpqyurt></line> </svg> <span data-astro-cid-sgpqyurt>${errorMsg}</span> </div>`, addAttribute(activeTab, "value"), defineScriptVars({ activeTab }));
}, "/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/login.astro", void 0);

const $$file = "/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
