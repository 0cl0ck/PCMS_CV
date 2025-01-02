# Product Requirements Document (PRD) pour Chanvre Vert

## Introduction

Nom du Projet/Produit: Chanvre Vert
Nom de Domaine: chanvre-vert.fr
Mission/Vision: Créer un espace en ligne où les utilisateurs peuvent facilement acheter des produits à base de CBD tout en ayant accès à de l'information éducative via un blog dédié à la santé et au bien-être liés au CBD et autres substances.

## Problem

Problème: Difficulté d'accès aux produits CBD en France et en Belgique, accentuée par les restrictions publicitaires. Besoin d'information correcte et fiable sur le CBD et les risques associés à d'autres substances.
Besoin: Une plateforme qui combine la vente de CBD avec un blog informatif, contournant les restrictions de publicité par le biais de l'affiliation et du SEO.

## Solution

Offre: Un site web de commerce électronique pour l'achat facile de produits CBD, complété par un blog éducatif traitant des aspects santé et bien-être liés au CBD et autres substances, sans fournir de conseil médical. Le site doit être en Français.

## Target Audience

Public Cible: Principalement francophones qui ont arrêté ou essaient d'arrêter le THC, avec une cible d'âge autour de la trentaine, mais non limité à cette tranche d'âge.

## Tech Stack

### Frontend

Next.js (v15)
React (v19.0.0-rc)
TypeScript
TailwindCSS avec shadcn/ui, tailwind-merge, tailwindcss-animate

### Backend

Payload CMS avec plugins :
@payloadcms/plugin-form-builder
@payloadcms/plugin-nested-docs
@payloadcms/plugin-redirects
@payloadcms/plugin-seo
@payloadcms/plugin-search
@payloadcms/richtext-lexical

### Base de données

MongoDB (via @payloadcms/db-mongodb)
Option pour Vercel Postgres

### Outils de développement

pnpm, ESLint, Prettier, Docker

### Autres technologies

Prism, React Hook Form, Geist, Sharp

## Core Features

Catégories de Produits: Fleurs CBD, Résines CBD, Huiles CBD, Infusions CBD, Gélules CBD, Bonbons CBD, Packs CBD, Meilleures Ventes, Promotions.
Fonctionnalités: Liste des produits, panier d'achat, processus de paiement avec Viva Wallet Smart Checkout, gestion utilisateur, blog intégré.

## Scope of Work

### MVP (Produit Minimum Viable):

Site de commerce électronique fonctionnel avec possibilité de paiement via VivaWallet.
Ajout de produits au panier, ajustement du panier, et redirection vers VivaWallet pour le paiement.

### Développements Futurs:

Programme de fidélité
Email Marketing

## Autres Questions

### Conformité Légale

Teneur en THC inférieure à 0.3% en France et 0.2% en Belgique.
Extraction du CBD de variétés de chanvre autorisées.

### UX/UI

Design simple, moderne, orienté SEO, pour une expérience utilisateur rapide et efficace.

### Intégrations

Paiement avec Viva Wallet Smart Checkout.

## Objectifs

Générer des revenus significatifs.
Augmenter le trafic et les ventes sur le site.
Développer un blog informatif et utile.
