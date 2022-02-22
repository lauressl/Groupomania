# Groupomania

## Cloner le projet
   Ouvrir un terminal. \
   Depuis le dossier choisi : `git clone https://github.com/lauressl/Groupomania.git`

## Base de données
   Créer une nouvelle basse de données MySQL;

## Lancer le serveur

Aller dans le dossier backend : cd backend
- Installer les dépendances : npm install

Configurer le fichier .env
  - Depuis le dossier "backend" : `cd backend`
     - Créer un fichier `.env`
     - Compléter le fichier .env :
  ```
  NAME_BDD='nom de la base de données'
  USER_BDD='nom de l'utilisteur de la base de données'
  PWD_BDD='mot de passe de la base de données'
  PORT= port du serveur
  JWT_SIGN_SECRET='token choisi'
  FRONT_URL=http://localhost:3000
  ```

- Depuis le dossier backend/config:
  - Compléter le fichier config.json:
  ```
  {
   "development": {
      "username": "nom de l'utilisateur de la base de données",
      "password": "mot de passe de la base de données",
      "database": "nom de la base de données",
      "host": "host de la base de données",
      "dialect": "mysql",
      "port":port de la base de données
     }
  }
  ```

## Lancer le site

Aller dans le dossier frontend : `cd frontend`
- Installer les dépendances : npm install
- Configurer le fichier .env
   - Compléter le fichier .env :
  ```
  REACT_APP_IP_SERVER=ip du serveur
  REACT_APP_IP_FRONT=ip du front
  ```
- Lancer le site : npm start
- Naviguer sur le site :
  - S'inscrire
  - Se connecter
  - Créer un post, liker et commenter les autres posts. Personnaliser son profil.

## Administration
Pour avoir accès à la modération des commentaires et des posts :
- Dans la base de données, choisir un utilisateur et mettre un 1 dans la colonne "isAdmin" pour le définir en tant qu'administrateur. 
