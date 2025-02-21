import config from '@/payload.config';
import payload, { Payload } from 'payload';

// Déclaration globale pour TypeScript
declare global {
  var __payload: Payload | null;
}

// Initialisation de la variable globale si nécessaire
if (!global.__payload) {
  global.__payload = null;
}

export const getPayload = async (): Promise<Payload> => {
  if (global.__payload) {
    return global.__payload;
  }

  try {
    if (!process.env.PAYLOAD_SECRET) {
      throw new Error('PAYLOAD_SECRET is required');
    }

    // Log pour le debug
    console.log('[Payload] Initializing new instance');

    await payload.init({
      config,
      // Options pour éviter les problèmes de connexion
      local: process.env.NEXT_PUBLIC_SERVER_URL ? false : true,
    });

    // Stockage dans la variable globale
    global.__payload = payload;
    
    return global.__payload;
  } catch (error: any) {
    // Si l'erreur est due à une double initialisation, on retourne l'instance existante
    if (error.message?.includes('Cannot overwrite') || error.message?.includes('already initialized')) {
      console.log('[Payload] Using existing instance');
      global.__payload = payload;
      return global.__payload;
    }

    console.error('[Payload] Error initializing:', error);
    throw error;
  }
};

export default getPayload;
