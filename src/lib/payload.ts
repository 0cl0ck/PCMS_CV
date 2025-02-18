import configPromise from '@/payload.config';
import payload from 'payload';

let payloadInstance: typeof payload | null = null;

// ✅ Fonction pour récupérer une instance Payload correctement
export const getPayload = async () => {
  if (payloadInstance) return payloadInstance;

  try {
    if (!process.env.PAYLOAD_SECRET) {
      throw new Error('PAYLOAD_SECRET is required');
    }

    await payload.init({
      config: await configPromise,
    });

    payloadInstance = payload;
    return payloadInstance;
  } catch (error) {
    if (error.message?.includes('Cannot overwrite `payload` instance')) {
      payloadInstance = payload;
      return payloadInstance;
    }
    console.error('Error initializing Payload:', error);
    throw error;
  }
};

export default getPayload;
