import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:Jhnlisto19066.@cluster0.kviyc1e.mongodb.net/rifa?appName=Cluster0";
let client;
let clientPromise;
{
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}
async function getDb() {
  const conn = await clientPromise;
  return conn.db();
}

const JWT_SECRET = "9c4137b584f0979a975e4eb772cc7d8c281d193fc4d9a4c48d0fc8250e53914a";
function parseCookies(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = {};
  cookieHeader.split(";").forEach((rawCookie) => {
    const parts = rawCookie.split("=");
    if (parts.length === 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  return cookies;
}
async function getUserFromRequest(request) {
  try {
    const cookies = parseCookies(request);
    const token = cookies.session;
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) return null;
    const db = await getDb();
    const user = await db.collection("users").findOne({ username: decoded.username });
    if (!user) return null;
    return {
      _id: user._id.toString(),
      username: user.username
    };
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    return null;
  }
}
async function registerUser(username, password) {
  const db = await getDb();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    throw new Error("Por favor ingresa un correo electrónico válido");
  }
  const existingUser = await db.collection("users").findOne({ username: username.toLowerCase().trim() });
  if (existingUser) {
    throw new Error("El correo electrónico ya está registrado");
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const result = await db.collection("users").insertOne({
    username: username.toLowerCase().trim(),
    passwordHash,
    createdAt: /* @__PURE__ */ new Date()
  });
  const token = jwt.sign({ userId: result.insertedId.toString(), username: username.toLowerCase().trim() }, JWT_SECRET, { expiresIn: "7d" });
  return { token, username: username.toLowerCase().trim() };
}
async function loginUser(username, password) {
  const db = await getDb();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    throw new Error("Por favor ingresa un correo electrónico válido");
  }
  const user = await db.collection("users").findOne({ username: username.toLowerCase().trim() });
  if (!user) {
    throw new Error("Correo electrónico o contraseña incorrectos");
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Correo electrónico o contraseña incorrectos");
  }
  const token = jwt.sign({ userId: user._id.toString(), username: user.username }, JWT_SECRET, { expiresIn: "7d" });
  return { token, username: user.username };
}

export { getDb as a, getUserFromRequest as g, loginUser as l, registerUser as r };
