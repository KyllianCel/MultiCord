# 🛡️ MultiCord 

**MultiCord** est un bot Discord multifonction développé en **TypeScript**. Il comporte un moteur musical avec un système de modération soutenu par une base de données Ce projet a été réalisé dans le cadre de notre licence informatique.


## ✨ Fonctionnalités Principales

### 🎵 Module Musique

  * **Moteur Lavalink v4** : Traitement du flux audio pour garantir une lecture sans ralentir le bot
  * **Interface Interactive** : Cartes de lecture visuelles avec pochette, durée et boutons de contrôle (Skip, Stop)
  * **Optimisation de l'experience utilisateur** : Système d'autocomplétion en temps réel pour la recherche de morceaux et retrait automatique des boutons en fin de lecture pour éviter les erreurs de clic.

### 🛡️ Module Modération & Sécurité

  * **Sanctions Persistantes** : Enregistrement des avertissements (Warnings) dans une base de données **SQLite** via l'ORM **Prisma**.
  * **Gestion de la Hiérarchie** : Vérification automatique des droits pour empêcher toute action sur un membre ayant un rôle supérieur au bot.
  * **Nettoyage de Masse** : Suppression ciblée ou globale de messages (jusqu'à 100) pour lutter contre le spam.

-----

## 📜 Liste des Commandes

| Catégorie | Commande | Description |
| :--- | :--- | :--- |
| **Modération** | `/ban` / `/unban` | Bannit ou débannit un membre du serveur. |
| | `/kick` | Expulse un membre du serveur. |
| | `/mute` | Réduit un membre au silence (Timeout). |
| | `/warn` / `/delwarn` | Gère les avertissements persistants en base de données. |
| | `/clear` | Supprime un nombre précis de messages. |
| **Musique** | `/play` | Recherche et joue une musique. |
| | `/queue` | Affiche la liste des musiques à venir. |
| | `/skip` | Passe à la musique suivante. |
| | `/stop` | Arrête la musique et vide la file d'attente. |
| **Utilitaire** | `/help` | Affiche les commandes. |
| | `/ping` | Vérifie si le bot est actif. |
| | `/userinfo` | Affiche les statistiques et informations d'un membre. |
| | `/warnings` | Liste les avertissements d'un membre. |
| | `/settings` | Affiche la configuration actuelle du bot. |
| | `/setup` | Configure les paramètres pour le serveur. |

-----

## 🛠️ Stack Technique & Infrastructure

  * **Langage** : TypeScript pour un code sécurisé et typé.
  * **Base de données** : SQLite gérée par l'ORM Prisma.
  * **Serveur Audio** : Lavalink v4 tournant sous Java 21.
  * **Hébergement** : Déploiement sur un **VPS Linux**.
  * **Gestion de processus** : **PM2** pour garantir une disponibilité 24h/24 et un redémarrage automatique en cas de crash.

-----

## 📥 Installation & Déploiement

1.  **Pré-requis** : Node.js (v18+), Java 21, et un serveur Lavalink configuré sur le port 2333.
2.  **Installation** :
    ```bash
    npm install
    npx prisma generate
    npx prisma db push
    ```
3.  **Déploiement des commandes** :
    ```bash
    npm run deploy
    ```
4.  **Lancement** :
    ```bash
    pm2 start lavalink/Lavalink.jar --name lavalink
    pm2 start "wait-on tcp:2333 && npx tsx src/index.ts" --name "multicord-bot" --restart-delay 5000
    ```

-----

### 👤 Auteurs

  * **Kyllian Celisse**
  * **Julien Gosselet**