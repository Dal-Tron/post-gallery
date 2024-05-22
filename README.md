![Post Gallery Project](https://user-images.githubusercontent.com/16243531/217138979-b854309c-4742-4275-a705-f9fec5158217.jpg)

# Post Gallery Project

This project is a Post Gallery web application built with Vite, React, TypeScript, and TailwindCSS. It features a paginated gallery of posts, detailed views of individual posts, and interactive elements like a "Like" button, leveraging GraphQL for data fetching and mutations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Running the Project](#running-the-project)
  - [Linting](#linting)
  - [Type Checking](#type-checking)
  - [Building](#building)

## Features

- Paginated gallery of posts
- Detailed view of individual posts
- "Like" button with live updates
- Responsive design
- GraphQL integration for data fetching and mutations

## Tech Stack

- **Framework/Libraries:** Vite, React (functional components with hooks), TypeScript
- **Styling:** TailwindCSS
- **Routing:** React Router
- **Data Management:** Apollo Client, GraphQL
- **Linting:** Eslint
- **Code Formatting:** Prettier

## Getting Started

### Installation

Clone the repository.

```bash
git clone https://github.com/Dal-Tron/post-gallery.git
```

Access the project directory.

```bash
cd post-gallery
```

Install dependencies.

```bash
pnpm install
```

### Setup Environment Variables

Create a .env file in the root directory and add your GraphQL endpoint and access token:

```env
NODE_ENV= dev | prod
VITE_ACCESS_TOKEN=your-access-token
```

### Running the Project

Serve with hot reload at [http://localhost:5173](http://localhost:5173).

```bash
pnpm run dev
```

### Linting

```bash
pnpm run lint
```

### Type Checking

```bash
pnpm run typecheck
```

### Building

```bash
pnpm run build
```

### Commits

```bash
pnpm gc
```

You should be prompted with a commit type and message input
