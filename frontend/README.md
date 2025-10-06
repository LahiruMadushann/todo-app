# Todo Application

## Technology Stack

### Backend

- **Language:** Java 17
- **Framework:** Spring Boot 3.2.0
- **ORM:** Spring Data JPA / Hibernate
- **Database:** PostgreSQL 15
- **Build Tool:** Maven
- **Testing:** JUnit 5, Mockito

### Frontend

- **Language:** TypeScript
- **Framework:** React 19
- **State Management:** Redux Toolkit
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Testing:** Vitest, React Testing Library

### DevOps

- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Web Server:** Nginx (for frontend)

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### Step 2: Verify Project Structure

Ensure you have the following directories:

- `todo-backend/` with Dockerfile and pom.xml
- `frontend/` with Dockerfile and package.json
- `docker-compose.yml` at the root

## Running the Application

### Option 1: Using Docker Compose

Start all services:

```bash
docker-compose up --build -d
```

After build successfully go to http://localhost:5173/

### Option 2: Development Mode (Without Docker)

**Backend:**

```bash
cd todo-backend
mvn spring-boot:run
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

After run successfully go to http://localhost:5173/

## Testing

### Testing in Docker

**Backend tests:**

```bash
docker-compose run --rm backend mvn test
```

**Frontend tests:**

```bash
docker-compose run --rm frontend npm test
```

### Testing in Development Mode (Without Docker)

**Backend tests:**

```bash
cd todo-backend
mvn test
mvn clean test jacoco:report
```

**Frontend tests:**

```bash
cd frontend
npm test
npm run test:coverage
```