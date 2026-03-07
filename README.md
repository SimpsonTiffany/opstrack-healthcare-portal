OpsTrack Healthcare Portal is a backend healthcare case-tracking API developed through a three-sprint Agile SDLC process. The final version demonstrates authentication, database integration, automated testing, and deployment using professional software development practices.

Sprint 1 focuses on core system setup and professional development workflow rather than advanced feature completeness.

 Project Links

-GitHub Repository: https://github.com/SimpsonTiffany/opstrack-healthcare-portal.git
-Deployed API (Render): https://opstrack-healthcare-portal-api.onrender.com
-Jira Sprint 1 Board:
https://simpsontiffany325.atlassian.net/jira/software/projects/OTHP/boards/1/backlog

 Tech Stack

Node.js

Express.js

Sequelize ORM

PostgreSQL (Render production database)

JWT Authentication

Jest + Supertest (API testing)

Render (deployment platform)

 Architecture Overview

This MVP follows a layered backend architecture:

Routes Layer – Handles HTTP requests and responses

Middleware Layer – Authentication and role validation

Models Layer – Sequelize ORM models for User and Case

Database Layer – PostgreSQL (production)

Configuration Layer – Environment-based configuration

Separation of concerns was implemented to support scalability and future sprint expansion.

 Design Patterns

 Layered Architecture Pattern

The application follows a layered architecture separating routes, middleware, models, and configuration. This improves maintainability and scalability by isolating responsibilities between different parts of the system. Each layer focuses on a specific role in the application, allowing the system to be extended more easily as new features are added.

 Middleware Pattern
Express middleware is used to implement authentication and role-based authorization. Middleware functions intercept incoming requests before they reach route handlers, allowing reusable logic such as authentication checks, token validation, and role enforcement to be applied across multiple endpoints without duplicating code.

 Authentication Features

Sprint 1 includes:

User Registration

User Login

JWT token generation

Auth middleware protection

Role-based access middleware (admin/staff foundation)

 Testing Strategy

Basic backend tests were implemented using:

Jest

Supertest

Test coverage incluedes authentication workflow verification using Jest and Supertest. Tests currently validate successful user registration, successful login, and invalid login handling. These tests help confirm that critical API authentication functionality behaves correctly under both success and failure scenarios.

Test coverage includes:
-User registration endpoint
-User login endpoint
-JWT generation validation
-Tests pass locally before deployment.

Run tests locally:

cd server
npm test
 Local Setup Instructions
1. Clone Repository
git clone https://github.com/SimpsonTiffany/opstrack-healthcare-portal.git
cd opstrack-healthcare-portal/server
2. Install Dependencies
npm install
3. Create .env File

Inside /server create:

PORT=3000
JWT_SECRET=mySuperSecureJWTSecret_2026_Tiffany
DATABASE_URL=postgresql://opstrack_db_user:Wpv06uDDNVQZrO31aUXccyJ2vOCwiMT1@dpg-d6if2m56ubrc73c7t0e0-a/opstrack_db
4. Run Development Server
npm run dev

Server runs at:

http://localhost:3000
🌐 Deployment

This application is deployed on Render.

Production environment variables configured:

DATABASE_URL

JWT_SECRET

NODE_ENV=production

Sprint Development Summary
Sprint 1 – Core System Setup (MVP)
• Repository initialized with professional structure
• Feature branch development and commit workflow
• Authentication system implemented (JWT + bcrypt)
• Sequelize database integration
• Environment variable configuration
• Initial automated tests created using Jest and Supertest

Sprint 2 – Feature Expansion
• Expanded API routes for case management
• Role-based access control improvements
• Backend deployment configuration on Render
• Additional endpoint validation and testing

Sprint 3 – Production Readiness
• Final deployment verification on Render
• Documentation updates including architecture and design patterns
• CI/CD pipeline configuration using GitHub Actions
• Jira sprint completion with full user story tracking
• Final project stabilization and portfolio documentation

Known Limitations

• Case CRUD endpoints are scaffolded but not fully expanded
• Role-based authorization will continue to evolve for additional permission layers
• Additional integration testing could be implemented for larger datasets

Future Enhancements

• Full Case CRUD operations expansion
• Additional role-based route protection
• Expanded automated test coverage
• Improved frontend integration for complete full-stack workflow

CI/CD Pipeline

Continuous Integration is configured using GitHub Actions.

The pipeline automatically runs the Jest test suite whenever code is pushed or a pull request is opened. This ensures that new changes do not break existing functionality before deployment.

Benefits of this workflow:
• Automated verification of API endpoints
• Faster debugging during development
• More reliable production deployments
