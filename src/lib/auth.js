import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from './db';


const JWT_SECRET = import.meta.env.JWT_SECRET || 'fallback_secret_key_12345';

// Parse Cookies from request headers
export function parseCookies(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = {};
  cookieHeader.split(';').forEach(rawCookie => {
    const parts = rawCookie.split('=');
    if (parts.length === 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  return cookies;
}

// Get User from Request using JWT session cookie
export async function getUserFromRequest(request) {
  try {
    const cookies = parseCookies(request);
    const token = cookies.session;
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) return null;

    const db = await getDb();
    const user = await db.collection('users').findOne({ username: decoded.username });
    if (!user) return null;

    return {
      _id: user._id.toString(),
      username: user.username
    };
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return null;
  }
}

// Register user
export async function registerUser(username, password) {
  const db = await getDb();

  // Enforce email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    throw new Error('Por favor ingresa un correo electrónico válido');
  }

  // Check if user already exists
  const existingUser = await db.collection('users').findOne({ username: username.toLowerCase().trim() });
  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Insert user
  const result = await db.collection('users').insertOne({
    username: username.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date()
  });

  const token = jwt.sign({ userId: result.insertedId.toString(), username: username.toLowerCase().trim() }, JWT_SECRET, { expiresIn: '7d' });
  return { token, username: username.toLowerCase().trim() };
}

// Login user
export async function loginUser(username, password) {
  const db = await getDb();

  // Enforce email format check on login too
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username)) {
    throw new Error('Por favor ingresa un correo electrónico válido');
  }

  const user = await db.collection('users').findOne({ username: username.toLowerCase().trim() });
  if (!user) {
    throw new Error('Correo electrónico o contraseña incorrectos');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Correo electrónico o contraseña incorrectos');
  }

  const token = jwt.sign({ userId: user._id.toString(), username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  return { token, username: user.username };
}
