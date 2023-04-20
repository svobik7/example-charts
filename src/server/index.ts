import { getCasesBySex } from '@/libs/ukcovid-api/actions/getCasesBySex';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getCasesBySex: publicProcedure.query(() => getCasesBySex()),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
