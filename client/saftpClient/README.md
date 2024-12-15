# Warehouse Frontend

This is the frontend application for the Warehouse Management System. It provides a user interface for managing warehouse operations.

## Table of Contents

- [Warehouse Frontend](#warehouse-frontend)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Usage](#usage)

## Project Structure

- .env
- .gitignore
- [eslint.config.js](http://_vscodecontentref_/1)
- [index.html](http://_vscodecontentref_/2)
- [package.json](http://_vscodecontentref_/3)
- [postcss.config.js](http://_vscodecontentref_/4)
- public/
- [README.md](http://_vscodecontentref_/5)
- src/
  - App.css
  - App.tsx
  - assets/
  - components/
    - buttons/
    - layout/
    - modal/
    - Overlay.tsx
    - sidebar/
    - tables/
  - contexts/
    - ModalContext.tsx
    - ProductContext.tsx
    - SidebarContext.tsx
  - interfaces/
    - Button.ts
    - ButtonProps.ts
    - ButtonTypes.ts
    - ModalContextType.ts
    - ...
  - main.tsx
  - pages/
    - ...
  - tailwind.css
  - vite-env.d.ts
- [tailwind.config.js](http://_vscodecontentref_/6)
- [tsconfig.app.json](http://_vscodecontentref_/7)
- [tsconfig.json](http://_vscodecontentref_/8)
- [tsconfig.node.json](http://_vscodecontentref_/9)
- [vite.config.ts](http://_vscodecontentref_/10)

## Dependencies

This frontend depends on the ProductAttributeController branch of the warehouse-backend. The backend can be cloned from https://github.com/svenniz/spac-warehouse/tree/ProductAttributeController.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/AndreasEDB/warehouse-frontend.git
```

2. Navigate to the project directory:

```sh
cd warehouse-frontend
```

3. Install dependencies:

```sh
yarn install
```

## Usage

1. Start the development server:

```sh
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`.
