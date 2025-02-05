import configPromise from '@/payload.config';
import payload from 'payload';

let payloadInstance: typeof payload | null = null;

// ✅ Fonction pour récupérer une instance Payload correctement
export const getPayload = async () => {
  if (!payloadInstance) {
    try {
      await payload.init({
        config: await configPromise, // Charge la config Payload
      });
      payloadInstance = payload;
    } catch (error) {
      // Si l'erreur est due à une réinitialisation, on retourne l'instance existante
      if (error.message?.includes('Cannot overwrite')) {
        payloadInstance = payload;
      } else {
        throw error;
      }
    }
  }
  return payloadInstance;
};

export default getPayload;
