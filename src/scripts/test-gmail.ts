import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_APP_PASS;

console.log('Configuration:');
console.log('SMTP_USER:', SMTP_USER);
console.log('SMTP_PASS:', SMTP_PASS ? '****' + SMTP_PASS.slice(-4) : undefined);

async function testGmail() {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('Variables d\'environnement SMTP_USER ou SMTP_APP_PASS manquantes');
  }

  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
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
      to: SMTP_USER,
      subject: 'Test Gmail SMTP',
      text: 'Si vous recevez cet email, la configuration Gmail SMTP fonctionne correctement.',
      html: '<p>Si vous recevez cet email, la configuration Gmail SMTP fonctionne correctement.</p>',
    });

    console.log('Email envoyé ✓');
    console.log('ID du message:', info.messageId);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Exécuter le test
testGmail();
