import { defineConfig } from 'cypress';

const PORT = process.env.PORT || 3030;

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {},
    baseUrl: `http://localhost:${PORT}`,
    video: false,
  },
});
