import { g as getUserFromRequest, a as getDb } from '../../../chunks/auth_L9zmvvbl.mjs';
import { ObjectId } from 'mongodb';
export { renderers } from '../../../renderers.mjs';

async function POST({ request }) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const db = await getDb();

    const raffleData = {
      userId: user._id,
      beneficiary: body.beneficiary,
      description: body.description,
      cost: body.cost,
      no: body.no,
      date: body.date,
      slogan: body.slogan,
      rows: parseInt(body.rows) || 10,
      color: body.color,
      scale: parseFloat(body.scale) || 1,
      tableSpacing: parseInt(body.tableSpacing) || 12,
      prizesSpacing: parseInt(body.prizesSpacing) || 8,
      background: body.background,
      columns: body.columns || [],
      prizes: body.prizes || [],
      surprisePrize: body.surprisePrize || '',
      hasSurprise: !!body.hasSurprise,
      participants: body.participants || [],
      status: body.status || 'activa',
      updatedAt: new Date()
    };

    if (body._id) {
      // Update existing
      await db.collection('raffles').updateOne(
        { _id: new ObjectId(body._id), userId: user._id },
        { $set: raffleData }
      );
      return new Response(JSON.stringify({ success: true, id: body._id }));
    } else {
      // Insert new
      raffleData.createdAt = new Date();
      const result = await db.collection('raffles').insertOne(raffleData);
      return new Response(JSON.stringify({ success: true, id: result.insertedId.toString() }));
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
