# 📈 Internal Stock Broking Dashboard

A full-stack stock broking dashboard that synchronizes data from a simulated BSE API into a local mysql database and serves all user requests from the local cache for fast, reliable access.

The project consists of two independent applications:

- **Part A:** Mock BSE API
- **Part B:** Internal Dashboard (Backend + Frontend)

---

# 📑 Table of Contents

- Project Overview
- Features
- Technology Stack
- Repository Structure
- Setup Instructions
- Running the Applications
- Architecture
- Design Decisions
- Scaling to 100× Data Volume
- Links
- Future Improvements

---

# Project Overview

The goal of this project is to simulate how an internal stock broking platform interacts with an external exchange.

Instead of directly querying the exchange for every request, a background synchronization service periodically fetches data from the external API and stores it locally. All dashboard requests are then served from Mysql, ensuring low latency, resilience, and a better user experience even if the external API is slow or temporarily unavailable.

---

# Features

## Part A – Mock BSE API

- Simulates an external BSE service
- REST APIs for
  - Clients
  - Trades
  - Employees
  - Mappings
- Random response delays
- Random failures (to test retry logic)
- Seeded sample data

---

## Part B – Internal Dashboard

### Backend

- Express.js REST APIs
- Mysql database
- Background synchronization service
- Retry mechanism for failed syncs
- Incremental data synchronization
- Pagination
- Search
- Trade date filters
- Incentive calculation
- Employee–Client mapping
- Socket.IO for real-time dashboard updates

### Frontend

- Next.js (App Router)
- Material UI
- React Query
- Dashboard
- Employee Login
- Clients
- Trades
- Employees
- Incentives
- My Clients
- Server-side pagination
- Debounced search
- Loading & error states
- Automatic data refresh using Socket.IO

---

# Technology Stack

## Backend

- Node.js
- Express.js
- Mysql
- Socket.IO
- ORM

## Frontend

- Next.js 15
- React
- Material UI
- React Query
- Axios

---

# Repository Structure

```
stock-broking-dashboard
│
├── bse_service
│   ├── src
│   ├── package.json
│   └── README.md
│
├── internal_service
│   ├── src
│   ├── package.json
│   └── README.md
│
├── internal_dashboard
│   ├── src
│   ├── package.json
│   └── README.md
│
├── package.json
└── README.md
```

---

# Setup Instructions

## Prerequisites

- Node.js >= 20
- Mysql >= 8.0
- npm

---

## 1. Clone Repository

```bash
git clone <repository-url>

cd stock-broking-dashboard
```

---

## 2. Setup Mysql

Create a new database.

Example:

```sql
CREATE DATABASE stock_dashboard;
```

---

## 3. Configure Environment Variables

Refer `.env.example` for variable inside every folder

# Database restore

Execute `db_seeder.sql` file for table sturcture, Data will automaticaly sync from bse_service

# Running the Applications

## Step 1 — Start bse_service

```bash
cd bse_service

npm install

npm run dev
```

Runs at

```
http://localhost:3000
```

---

## Step 2 — Start internal_service

```bash
cd internal_service

npm install

npm run dev
```

Runs at

```
http://localhost:3500
```

The backend automatically:

- Syncs data from Mock BSE API
- Stores data in Mysql
- Retries failed syncs
- Emits Socket.IO events after successful synchronization

---

## Step 3 — Start internal_dashboard

```bash
cd internal_dashboard

npm install

npm run dev
```

Runs at

```
http://localhost:4000
```

---

# Authentication

A lightweight employee authentication flow has been implemented.

- Employee enters their Employee Code
- Backend validates the employee
- Employee information is stored locally
- Protected routes require authentication
- Logout clears the local session

This approach keeps the assignment simple while demonstrating route protection without introducing JWT or refresh-token complexity.

---

# Architecture

```
                        ┌─────────────────────────┐
                        │      Mock BSE API       │
                        │ (External Exchange API) │
                        └─────────────┬───────────┘
                                      │
                           Background Sync (Cron)
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │    Internal Backend     │
                        │  Express + Socket.IO    │
                        └─────────────┬───────────┘
                                      │
                             Read / Write
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │           Mysql         │
                        └─────────────┬───────────┘
                                      │
                              REST + WebSocket
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │     Next.js Dashboard   │
                        └─────────────────────────┘
```

---

# Architecture Reasoning

The dashboard **never communicates directly with the external BSE API**.

Instead:

1. A scheduled synchronization service periodically fetches data from the external API.
2. Data is stored in Mysql.
3. All dashboard APIs serve data from Mysql.
4. Socket.IO notifies connected clients whenever new data is synchronized.
5. React Query automatically refreshes affected data.

### Benefits

- Fast response times
- Reduced dependency on external systems
- Works even when the external API is slow
- Easier retry handling
- Better scalability
- Improved user experience

---

# Scaling to 100× Data Volume

If the application needed to support approximately 100× more clients, trades, and users, the following architectural improvements would be introduced:

## Database

- Add indexes on frequently searched columns
- Partition large trade tables by date
- Optimize query plans
- Introduce read replicas for read-heavy workloads

## Synchronization

- Replace cron jobs with a distributed message queue (RabbitMQ/Kafka)
- Process synchronization in parallel workers
- Perform incremental updates instead of full synchronization

## Backend

- Horizontal scaling behind a load balancer
- Redis caching for frequently accessed data
- Stateless API servers

## Real-time Updates

- Use Redis Pub/Sub or Socket.IO Redis Adapter
- Support multiple backend instances

## Frontend

- Infinite scrolling or virtualization for very large datasets
- Lazy loading
- CDN for static assets

---

# Api Documentation & Links

## BSE Service API

```
http://localhost:3000/api-docs/stoplight.html
```

## Internal Service API

```
http://localhost:3500/api-docs/stoplight.html
```

---

## Internal Dashboard

```
http://localhost:4000/login
```

---

# 📸 Screenshots

## Login

![Login](./screenshots/login.png)

---

## Clients

![Clients](./screenshots/clients.png)

---

## Trades

![Trades](./screenshots/trades.png)

---

## Incentives

![Incentives](./screenshots/incentives.png)

---

# Future Improvements

- JWT Authentication
- Role-Based Access Control (RBAC)
- Audit logging
- Docker support
- Kubernetes deployment
- CI/CD pipeline
- Monitoring with Prometheus & Grafana
- Distributed background workers
- Redis caching
- Comprehensive unit and integration tests

---

# Author

**Abhay Mankari**

Software Engineer | Full Stack Developer
