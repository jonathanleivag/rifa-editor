import { c as createComponent, r as renderHead, a as renderTemplate, b as addAttribute, d as createAstro } from '../chunks/astro/server_CLj4HxU-.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getUserFromRequest, a as getDb } from '../chunks/auth_L9zmvvbl.mjs';
import { ObjectId } from 'mongodb';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$History = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$History;
  const user = await getUserFromRequest(Astro2.request);
  if (!user) {
    return Astro2.redirect("/login");
  }
  const db = await getDb();
  let errorMsg = "";
  let successMsg = "";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const action = formData.get("action");
      const raffleIdStr = formData.get("raffleId")?.toString() || "";
      if (!raffleIdStr) throw new Error("ID de rifa no proporcionado");
      const raffleId = new ObjectId(raffleIdStr);
      const raffle = await db.collection("raffles").findOne({ _id: raffleId, userId: user._id });
      if (!raffle) {
        throw new Error("Rifa no encontrada");
      }
      if (action === "delete") {
        await db.collection("raffles").deleteOne({ _id: raffleId });
        successMsg = "Rifa eliminada correctamente";
      } else if (action === "draw") {
        const participants = raffle.participants || [];
        if (participants.length === 0) {
          throw new Error("No hay participantes registrados para realizar el sorteo");
        }
        const prizes = raffle.prizes || [];
        const hasSurprise = raffle.hasSurprise;
        const surprisePrizeText = raffle.surprisePrize || "";
        const allPrizesList = [...prizes];
        if (hasSurprise && surprisePrizeText) {
          allPrizesList.push(surprisePrizeText);
        }
        if (allPrizesList.length === 0) {
          throw new Error("No hay premios configurados en esta rifa");
        }
        const winners = [];
        const soldTickets = participants.map((p) => p.rowNumber);
        allPrizesList.forEach((prizeName, prizeIndex) => {
          const randomIndex = Math.floor(Math.random() * soldTickets.length);
          const winningNumber = soldTickets[randomIndex];
          const participantObj = participants.find((p) => p.rowNumber === winningNumber);
          winners.push({
            prizeIndex: prizeIndex + 1,
            prizeName,
            winningNumber,
            winnerName: participantObj ? participantObj.data.name : "Ticket Vendido"
          });
        });
        await db.collection("raffles").updateOne(
          { _id: raffleId },
          {
            $set: {
              status: "finalizada",
              winners,
              updatedAt: /* @__PURE__ */ new Date()
            }
          }
        );
        successMsg = "\xA1Sorteo realizado con \xE9xito!";
      }
    } catch (err) {
      errorMsg = err.message || "Ocurri\xF3 un error inesperado";
    }
  }
  const raffles = await db.collection("raffles").find({ userId: user._id }).sort({ createdAt: -1 }).toArray();
  function formatMoney(amount) {
    return "$" + amount.toLocaleString("es-CL");
  }
  function parseTicketPrice(priceStr) {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\D/g, "")) || 0;
  }
  return renderTemplate`<html lang="es" data-astro-cid-tal57otx> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Historial de Rifas - Creador de Rifas</title><link rel="icon" type="image/jpeg" href="/favicon.jpg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-tal57otx> <div class="container" data-astro-cid-tal57otx> <div class="top-bar" data-astro-cid-tal57otx> <div data-astro-cid-tal57otx> <h1 data-astro-cid-tal57otx>Historial de Rifas</h1> <p style="color: var(--text-gray); font-size: 14px; margin-top: 4px;" data-astro-cid-tal57otx>Hola, ${user.username} • Gestiona tus boletos y realiza sorteos</p> </div> <div class="actions-top" data-astro-cid-tal57otx> <a href="/" class="btn btn-primary" data-astro-cid-tal57otx> <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <line x1="12" y1="5" x2="12" y2="19" data-astro-cid-tal57otx></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-tal57otx></line> </svg>
Nueva Rifa
</a> <a href="/logout" class="btn btn-secondary" data-astro-cid-tal57otx>Salir</a> </div> </div> ${errorMsg && renderTemplate`<div class="alert alert-error" data-astro-cid-tal57otx> <svg style="width: 18px; height: 18px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <circle cx="12" cy="12" r="10" data-astro-cid-tal57otx></circle> <line x1="12" y1="8" x2="12" y2="12" data-astro-cid-tal57otx></line> <line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-tal57otx></line> </svg> <span data-astro-cid-tal57otx>${errorMsg}</span> </div>`} ${successMsg && renderTemplate`<div class="alert alert-success" data-astro-cid-tal57otx> <svg style="width: 18px; height: 18px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-tal57otx></path> <polyline points="22 4 12 14.01 9 11.01" data-astro-cid-tal57otx></polyline> </svg> <span data-astro-cid-tal57otx>${successMsg}</span> </div>`} ${raffles.length === 0 ? renderTemplate`<div class="no-raffles" data-astro-cid-tal57otx> <h3 data-astro-cid-tal57otx>Aún no tienes rifas</h3> <p data-astro-cid-tal57otx>Crea tu primera rifa en el editor para comenzar a gestionar participantes y premios.</p> <a href="/" class="btn btn-primary" data-astro-cid-tal57otx>Diseñar Rifa</a> </div>` : renderTemplate`<div class="raffles-grid" data-astro-cid-tal57otx> ${raffles.map((raffle) => {
    const participantsCount = raffle.participants?.length || 0;
    const ticketPrice = parseTicketPrice(raffle.cost);
    const moneyRaised = participantsCount * ticketPrice;
    const isCompleted = raffle.status === "finalizada";
    return renderTemplate`<div class="raffle-card" data-astro-cid-tal57otx> <div class="card-header" data-astro-cid-tal57otx> <div data-astro-cid-tal57otx> <h2 data-astro-cid-tal57otx>${raffle.beneficiary || "Sin Beneficiario"}</h2> <p data-astro-cid-tal57otx>Creado el ${new Date(raffle.createdAt).toLocaleDateString("es-CL")} • ${raffle.date}</p> </div> <span${addAttribute(`badge ${isCompleted ? "badge-completed" : "badge-active"}`, "class")} data-astro-cid-tal57otx> ${isCompleted ? "Finalizada" : "Activa"} </span> </div> <div class="card-body" data-astro-cid-tal57otx> <div class="info-block" data-astro-cid-tal57otx> <span data-astro-cid-tal57otx>Números Vendidos</span> <strong data-astro-cid-tal57otx>${participantsCount} / ${raffle.rows}</strong> </div> <div class="info-block" data-astro-cid-tal57otx> <span data-astro-cid-tal57otx>Dinero Recaudado</span> <strong style="color: var(--green);" data-astro-cid-tal57otx>${formatMoney(moneyRaised)}</strong> </div> ${isCompleted && raffle.winners && raffle.winners.length > 0 && renderTemplate`<div class="winners-section" data-astro-cid-tal57otx> <h3 data-astro-cid-tal57otx> <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-astro-cid-tal57otx></path> </svg>
Ganadores del Sorteo
</h3> <ul class="winners-list" data-astro-cid-tal57otx> ${raffle.winners.map((winner) => renderTemplate`<li${addAttribute(winner.prizeIndex, "key")} data-astro-cid-tal57otx> <div data-astro-cid-tal57otx> <strong data-astro-cid-tal57otx>#${winner.winningNumber}</strong> • ${winner.winnerName} </div> <span data-astro-cid-tal57otx>${winner.prizeName}</span> </li>`)} </ul> </div>`} </div> <div class="card-actions" data-astro-cid-tal57otx> <a${addAttribute(`/?id=${raffle._id.toString()}`, "href")} class="btn btn-secondary" data-astro-cid-tal57otx> <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" data-astro-cid-tal57otx></path> <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" data-astro-cid-tal57otx></path> </svg>
Cargar en Editor
</a> ${!isCompleted && renderTemplate`<form method="POST" style="display:inline;" onsubmit="return confirm('¿Seguro que quieres realizar el sorteo? Esto seleccionará ganadores aleatorios entre los números vendidos.');" data-astro-cid-tal57otx> <input type="hidden" name="action" value="draw" data-astro-cid-tal57otx> <input type="hidden" name="raffleId"${addAttribute(raffle._id.toString(), "value")} data-astro-cid-tal57otx> <button type="submit" class="btn btn-primary"${addAttribute(participantsCount === 0, "disabled")}${addAttribute(participantsCount === 0 ? "Debes vender al menos un n\xFAmero para sortear" : "", "title")} data-astro-cid-tal57otx> <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <polyline points="23 4 23 10 17 10" data-astro-cid-tal57otx></polyline> <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" data-astro-cid-tal57otx></path> </svg>
Realizar Sorteo
</button> </form>`} <form method="POST" style="display:inline;" onsubmit="return confirm('¿Estás seguro de que quieres eliminar esta rifa? Esta acción no se puede deshacer.');" data-astro-cid-tal57otx> <input type="hidden" name="action" value="delete" data-astro-cid-tal57otx> <input type="hidden" name="raffleId"${addAttribute(raffle._id.toString(), "value")} data-astro-cid-tal57otx> <button type="submit" class="btn btn-danger" data-astro-cid-tal57otx> <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-tal57otx> <polyline points="3 6 5 6 21 6" data-astro-cid-tal57otx></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-astro-cid-tal57otx></path> <line x1="10" y1="11" x2="10" y2="17" data-astro-cid-tal57otx></line> <line x1="14" y1="11" x2="14" y2="17" data-astro-cid-tal57otx></line> </svg>
Eliminar
</button> </form> </div> </div>`;
  })} </div>`} </div> </body></html>`;
}, "/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/history.astro", void 0);

const $$file = "/Users/jonathanleivag/Development/jonathanleivag/rifa-editor/src/pages/history.astro";
const $$url = "/history";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$History,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
