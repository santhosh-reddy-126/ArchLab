# ArchLab

ArchLab is a high-level design visualizer: sketch a system, simulate traffic and see where it breaks. The backend is a Dropwizard API backed by Elasticsearch, and the frontend is a React + Vite app.

## Prerequisites

- Java 17+ and Maven 3.9+
- Node.js 20+ and npm
- Docker with Compose

## Local setup

### 1. Start the data services

From `backend/`:

```bash
docker compose up -d
```

This starts Elasticsearch on `localhost:9200` and Neo4j on `localhost:7474` / `7687`.

### 2. Set the Neo4j password

The app config and Compose file both require `NEO4J_PASSWORD`. Export it in the shell that starts the API:

```bash
export NEO4J_PASSWORD=your-local-password
```

PowerShell:

```powershell
$env:NEO4J_PASSWORD = "your-local-password"
```

### 3. Run the API

From `backend/`:

```bash
mvn clean package
java -jar target/ArchLab-1.0-SNAPSHOT.jar server config.yml
```

The application listens on `http://localhost:8080` (admin port `8081`).

### 4. Run the UI

From `frontend/`:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The UI calls the API at `http://localhost:8080` by default; override it with `VITE_API_BASE_URL` if needed.

## Useful URLs

| URL | Description |
| --- | --- |
| `http://localhost:5173` | Frontend dev server |
| `http://localhost:8080/api/v1/hello` | Health check |
| `http://localhost:8080/api/v1/auth/signUp` | Sign up |
| `http://localhost:8080/api/v1/auth/login` | Sign in |
| `http://localhost:8080/` | Swagger UI (default URI prefix is root) |
| `http://localhost:9200` | Elasticsearch |

The backend allows requests from `http://localhost:5173` and `http://localhost:3000`. Set `CORS_ALLOWED_ORIGINS` to a comma-separated list to change this.

## Tests and production build

```bash
cd backend && mvn test
cd frontend && npm run build && npm run preview
```

## Stop the services

From `backend/`:

```bash
docker compose down
```
