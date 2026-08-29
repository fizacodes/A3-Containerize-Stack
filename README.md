# A3 — Containerize Your Stack

A CRUD Task API built with Node.js, Express, and PostgreSQL. PostgreSQL runs in Docker, and Docker Compose starts the application and database together.

## Architecture

```text
Client
   ↓
Routes
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

The application uses a repository layer so the storage implementation can be changed without changing the service or API routes.

## Technologies

* Node.js
* Express.js
* PostgreSQL
* Docker
* Docker Compose
* `pg`
* dotenv

## Project Structure

```text
src/
├── db.js
├── routes/
│   └── taskRoutes.js
├── services/
│   └── taskService.js
└── repositories/
    ├── taskRepository.js
    └── postgresTaskRepository.js

sql/
└── schema.sql

Dockerfile
docker-compose.yml
.env.example
server.js
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/tasks
PORT=3000
```

The `.env` file is ignored by Git. A `.env.example` file is included to show the required configuration.

## Database

PostgreSQL runs inside a Docker container.

The database uses a Docker volume named:

```text
postgres-data
```

The volume allows PostgreSQL data to survive container restarts.

The database schema is created from:

```text
sql/schema.sql
```

## Run the Application

Make sure Docker Desktop is running, then execute:

```bash
docker compose up --build
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| GET    | `/tasks`     | Get all tasks |
| GET    | `/tasks/:id` | Get a task    |
| POST   | `/tasks`     | Create a task |
| PUT    | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Repository Pattern

The original application used an in-memory repository.

For this assignment, a PostgreSQL repository was added with the same repository interface.

The service and routes were kept unchanged in terms of their responsibilities and API behavior. Only the repository implementation was switched from in-memory storage to PostgreSQL.

```text
Service
   ↓
Repository interface
   ↓
PostgreSQL implementation
```

This demonstrates that changing the storage mechanism does not require rewriting the API.

## Persistence Test

Persistence was tested by:

1. Starting the stack with Docker Compose.
2. Creating a new task.
3. Confirming the task using `GET /tasks`.
4. Stopping the containers with:

```bash
docker compose down
```

5. Starting them again:

```bash
docker compose up
```

6. Calling `GET /tasks` again.
7. Confirming that the previously created task was still present.

The data remained available because PostgreSQL uses the persistent `postgres-data` Docker volume.

## SQL Schema

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE
);
```

## License

This project was created as part of a backend engineering assignment.
