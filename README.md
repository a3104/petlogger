# Project Setup

This project uses Svelte, Material UI, and TypeScript. Follow the instructions below to set up the environment.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/a3104/petlogger.git
   cd petlogger
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`.

## Project Structure

- `src/`: Contains the source code for the Svelte application.
  - `App.svelte`: Main Svelte component.
  - `main.ts`: Entry point for the Svelte application.
- `public/`: Contains the static files for the project.
  - `index.html`: Main HTML file to load the Svelte application.
- `svelte.config.js`: Configuration file for Svelte.
- `rollup.config.js`: Configuration file for Rollup.
- `tsconfig.json`: Configuration file for TypeScript.
- `package.json`: Contains project dependencies and scripts.

## Building for Production

To build the project for production, run:

```bash
npm run build
```

The production-ready files will be generated in the `public/build` directory.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
