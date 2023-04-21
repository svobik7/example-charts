## Foreword

Finished result can be found at [https://example-charts.vercel.app]. Although the project was easy I found some drawbacks that I would like to mention.

### Ant Design (NOT RECOMMENDED)

It is harder to spin off than other UI libs/tools. I would prefer to use something like [Tailwind CSS](https://tailwindcss.com/) as it is more flexible thanks to their atomic design and has better documentation.

### G2 by AntV (NOT RECOMMENDED)

Their documentation mixed English with Chinese language. Integration in Next.js (SSR) has to be done with workaround in place because the library's own dependencies are imported in a wrong way under the hood. Therefore it had to be imported dynamically (`const G2 = await import('@antv/g2');`) which goes against of SSR benefits.

The workaround can be seen in [./components/ChartYears/ChartYears.tsx] and [./components/ChartTotal/ChartTotal.tsx].

### Next.js, tRPC and Vercel (RECOMMENDED)

On the other had I could not agree more with using Next.js, tRPC and Vercel. They are all great tools and I would recommend them to anyone. In real world projects I would also use Prisma for DB manipulation.

## Introduction

This is a simple project to demonstrate participants' ability to use web technologies to build a web application. Tech stack focused by this project consists of:

- [Next.js](https://nextjs.org/)
- [Ant Design](https://ant.design/)
- [tRPC](https://trpc.io/)
- [G2 by AntV](https://g2.antv.vision/en)
- [Vercel](https://vercel.com/)

## Getting Started

For running the project locally use the following commands:

```bash
pnpm i && pnpm dev
```

Pnpm is recommended just because it's faster than npm and yarn. You can use npm or yarn if you want.

## Project Structure

Usually I prefer to use a feature grouping structure for my projects. But for this project I decided to use a file type structure. The reason is that the project is too small to benefit from feature grouping structure.

```bash
- components  # components that are used in pages
- libs        # 3rd party libraries adapters and wrappers
- pages       # Next.js pages
- server      # tRPC server handling api requests
- styles      # global styles
- utils       # utility functions
```

## Deployment

The project is deployed on Vercel. You can find the deployment at [https://example-charts.vercel.app]

## API

The project uses tRPC for handling api requests. You can find the api at [https://example-charts.vercel.app/api/trpc]. In scope of this project, the api is used as proxy server (BFF) for fetching data from external API [https://api.coronavirus.data.gov.uk/v1/data] and also as for manipulating DB (storage) data.

- tRPC server is located at [./server/index.ts]
- External API adapter is located at [./libs/ukcovid-api/index.ts]

## Database

For simplicity no external DB provider was integrate. Instead, a simple JSON is used as DB.

When the server starts in production mode, the JSON is stored in persistent storage (disk drive) to ensure the data stays consistent during multiple requests. The file is located at [./storage.json] and manipulated by tiny [next-storage](https://www.npmjs.com/package/node-storage) library. Please note that because of the nature of Vercel (serverless), the file does not stay consistent during multiple deployment. That means every new deployment will reset the file to its initial state.

When the server starts in development mode the JSON is loaded only into memory and is not persisted anyhow. The main reason behind this is to keep git logs free of storage files changes. Another reason is to ensure Cypress tests to always start with initial state of JSON.

## Git hooks

[Husky](https://typicode.github.io/husky/#/) is used for git hooks. You can find the hooks at [./husky] folder. Following hooks were set to help developers keep the code safe and clean:

- `pre-commit`: runs linting and formatting before every commit
- `pre-push`: runs tests before every push

## Testing

Cypress is used for testing. You can run the tests with the following command:

```bash
pnpm test
```

Tests are located at [./cypress/e2e] and are triggered before every git push.

## Data fetching

Two ways of data fetching were demonstrated in this project:

- Fetching data during static generation utilizing `getStaticProps` can be seen in [./pages/index.tsx] and is used to fetch custom data from DB (storage). That means data is fetched during build time and is not updated during runtime.
- Fetching from client browser utilizing `useQuery` hook from tRPC can be seen in [./components/ChartYears/ChartYears.tsx] and [./components/ChartTotal/ChartTotal.tsx] and is used to fetch data from external API through tRPC server as proxy (BFF). That means data is fetched during runtime and is updated during runtime.

## Styling

[Ant Design](https://ant.design/) is used for styling and building UI. Theme configuration, css modules and inline styles are all used to demonstrate different ways of styling.

## Charts

[G2 by AntV](https://g2.antv.vision/en) is used for building charts. Two charts are used in this project:

- [./components/ChartYears/ChartYears.tsx] is a bar chart that shows the number of cases per year in UK grouped by sex.
- [./components/ChartTotal/ChartTotal.tsx] is a pie chart that shows the total number of cases in UK grouped by sex.
