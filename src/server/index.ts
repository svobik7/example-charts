import { getFavorites, putFavorite } from '@/libs/node-storage';
import { getCases } from '@/libs/ukcovid-api/actions/getCases';
import z from 'zod';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getCases: publicProcedure.query(() => getCases()),
  getFavorites: publicProcedure.query(() => getFavorites()),
  putFavorite: publicProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.boolean(),
      }),
    )
    .mutation(({ input }) => putFavorite(input)),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
