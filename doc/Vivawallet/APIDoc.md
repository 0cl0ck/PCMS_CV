````markdown
# Documentation des APIs - Chanvre Vert

## 1. Smart Checkout API (Viva Wallet)

### Liens utiles

- [Documentation officielle](https://developer.vivawallet.com/smart-checkout/)
- [GitHub Viva Wallet](https://github.com/VivaPayments/API)

### Base URLs

- Production: https://api.vivapayments.com
- Demo: https://demo-api.vivapayments.com

### Authentication

Authorization: Bearer ${VIVA_WALLET_API_KEY}
Content-Type: application/json

### Endpoints principaux

#### Créer un ordre de paiement

```http
POST /checkout/v2/orders
```
````

Payload:

```json
{
  "amount": 1000,
  "customerTrns": "Description des articles/services",
  "customer": {
    "email": "client@example.com",
    "fullName": "John Doe",
    "phone": "+33612345678",
    "countryCode": "FR",
    "requestLang": "fr-FR"
  },
  "paymentTimeout": 300,
  "sourceCode": "1234"
}
```

#### Vérifier une transaction

```http
GET /checkout/v2/transactions/{transactionId}
```

### URLs de redirection

- Production: `https://www.vivapayments.com/web/checkout?ref={OrderCode}`
- Demo: `https://demo.vivapayments.com/web/checkout?ref={OrderCode}`

### Paramètres de redirection

- `t` : ID de transaction (UUID)
- `s` : ID de commande (16 chiffres)
- `lang` : Langue (ISO 639)
- `eventId` : Code événement Viva
- `eci` : Indicateur de commerce électronique

### Webhooks

- Transaction Payment Created
- Transaction Failed

### Bonnes pratiques

- Fournir fullName, email, customerTrns, requestLang et countryCode
- Utiliser des redirections plutôt que des iframes
- Vérifier explicitement le statut du paiement
- Configurer les webhooks pour les notifications

### Caractéristiques principales

- Taux de conversion moyen de 87,6% en Europe
- Jusqu'à 91,1% au Royaume-Uni
- 97,2% pour les clients avec carte sauvegardée
- Mise à jour automatique des méthodes de paiement
- Conformité réglementaire constante
- Support multilingue (17 langues)
- Support multi-devises (9 devises)

### Sécurité

- Conformité PCI DSS
- Support 3D Secure / SCA
- Protection contre la fraude par Machine Learning
- Gestion sécurisée des données sensibles

### Support

Pour toute assistance technique :

- Ouvrir une issue sur [GitHub](https://github.com/VivaPayments/API/issues)
- Consulter la [documentation développeur](https://developer.vivawallet.com/)
- Contacter le support via le chat en direct sur le site Viva Wallet

```

```
