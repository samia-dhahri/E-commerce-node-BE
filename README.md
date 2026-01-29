# E-commerce-node-BE
Architecture (simplifiée)
src/
├── cache/            # Redis client + helpers cache
├── controllers/      # Logique HTTP
├── services/         # Logique métier / DB
├── routes/           # Routes Express
├── middlewares/      # Middleware (cache, etc.)
├── db/               # Connexion PostgreSQL
├── index.js          # Point d’entrée

# Prérequis
- Node.js ≥ 18
- PostgreSQL installé et en cours d’exécution
- Redis en cours d’exécution (via Docker recommandé)
- npm

# Configuration Redis (via Docker)
Lancer Redis avec Docker Desktop :
docker run -d --name redis -p 6379:6379 redis:7
Vérifier que Redis fonctionne :
docker exec -it redis redis-cli ping

# Configuration des variables d’environnement
Créer un fichier .env à la racine du projet :

# Postgres
PG_USER=XXXXXXXX
PG_HOST=localhost
PG_DATABASE=XXXXXXXXXXX
PG_PASSWORD=XXXXXXXX
PG_PORT=5432

# Redis
REDIS_URL=redis://127.0.0.1:6379

# Lancer le projet en local
Installer les dépendances :
npm install
Lancer le serveur en mode développement :
npm run dev
Le serveur démarre sur :
http://localhost:3000
