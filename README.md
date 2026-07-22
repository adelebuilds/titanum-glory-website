# Titanum Glory Website

## Contact form configuration

The contact form posts to a Vercel Function, which validates each enquiry and sends it through Resend. Add these server-only variables in **Vercel → Project Settings → Environment Variables** for Production and Preview:

- `RESEND_API_KEY`: a Resend API key with sending permission
- `CONTACT_TO_EMAIL`: Adele's destination email address
- `CONTACT_FROM_EMAIL`: the sender using a domain verified in Resend, for example `Titanum Glory <enquiries@example.com>`

Do not prefix these variables with `VITE_`; that would expose them to the browser bundle. After adding or changing variables, redeploy the project. For local end-to-end testing, copy `.env.example` to `.env.local`, supply development values, and run the project with `vercel dev`.

The deployed sending domain must have the DNS records supplied by Resend configured before production delivery will work.

## Development

Run `npm run dev` for frontend-only work. Run `vercel dev` when testing the contact API locally.

Before deployment, run:

```sh
npm run lint
npm run build
```

## Vite notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
