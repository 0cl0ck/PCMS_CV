import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

// Vérifie que ce fichier exporte bien `getPayload`
export const getPayload = async () => {
  return await getPayloadHMR({ config: configPromise });
};

// Ajoute cette ligne pour s'assurer que le module est bien reconnu
export default getPayload;
