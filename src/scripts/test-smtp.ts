import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_APP_PASS;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;

console.log('Configuration:');
console.log('SMTP_HOST:', SMTP_HOST);
console.log('SMTP_PORT:', SMTP_PORT);
console.log('SMTP_USER:', SMTP_USER);
console.log('SMTP_PASS:', SMTP_PASS ? '****' + SMTP_PASS.slice(-4) : undefined);

async function testSMTP() {
  if (!SMTP_USER || !SMTP_PASS || !SMTP_HOST || !SMTP_PORT) {
    throw new Error('Variables d\'environnement SMTP manquantes');
  }

  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    debug: true,
    logger: true,
  });

  try {
    // Vérifier la configuration
    console.log('Vérification de la configuration SMTP...');
    await transporter.verify();
    console.log('Configuration SMTP valide ✓');

    // Envoyer un email de test
    console.log('Envoi d\'un email de test...');
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: SMTP_USER, // Envoyer à la même adresse
      subject: 'Test SMTP Chanvre Vert',
      text: 'Si vous recevez cet email, la configuration SMTP fonctionne correctement.',
      html: '<p>Si vous recevez cet email, la configuration SMTP fonctionne correctement.</p>',
    });

    console.log('Email envoyé ✓');
    console.log('ID du message:', info.messageId);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Exécuter le test
testSMTP();
