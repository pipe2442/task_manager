# Super Task Manager

This project is a full-stack application composed of:

- API: Ruby on Rails
- Client: React + Vite

## Requirements

Using Docker (recommended):

- Docker
- Docker Compose

Running locally (without Docker):

- Ruby (compatible with Rails 8)
- Rails
- Bundler
- Node.js (v18+ recommended)
- npm

## The easiest way to run this project is using Docker

From the repository root, run:

docker compose up --build

Once everything is running:

- API: http://localhost:3000
- Client: http://localhost:5173

## Run locally (without Docker)

API (Rails):

cd api
bundle install
rails db:prepare
rails s -b 0.0.0.0 -p 3000

API will be available at:
http://localhost:3000

Client (React + Vite):

cd client
npm install
npm run dev -- --host 0.0.0.0 --port 5173

Client will be available at:
http://localhost:5173

## Notes

- The API and Client must be running at the same time when working locally.
- Docker is recommended for the smoothest setup and environment consistency.

## Monorepo Approach and Deployment Strategy

Keeping both the backend and frontend in a single repository makes it easier to deploy the full application as one unit, especially using Docker. A single repo ensures that API and client configurations stay in sync and allows changes across both layers to be deployed together.

While a multi-repo setup can be useful for large teams with independent deployment pipelines, for this scope a monorepo provides a simpler and more reliable deployment flow.
