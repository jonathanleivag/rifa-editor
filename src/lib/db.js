import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;

if (!uri) {
  console.warn('ADVERTENCIA: La variable de entorno MONGODB_URI no está definida. Por favor crea un archivo .env en la raíz.');
}

let client;
let clientPromise;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
  // Fallback para evitar caídas catastróficas al construir
  clientPromise = Promise.resolve({
    db: () => ({
      collection: (name) => ({
        findOne: async () => null,
        find: () => ({ toArray: async () => [] }),
        insertOne: async () => ({ insertedId: 'mock' }),
        updateOne: async () => ({ modifiedCount: 0 }),
        deleteOne: async () => ({ deletedCount: 0 })
      })
    })
  });
}

export default clientPromise;

export async function getDb() {
  const conn = await clientPromise;
  return conn.db();
}
