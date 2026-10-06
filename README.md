### columbus crater — mars analog mission terrain explorer

a **next.js + three.js** 3d terrain explorer for **columbus crater on mars**, built for analog astronaut training and eva route planning.

<img width="1839" height="973" alt="Screenshot 2026-10-06 213326" src="https://github.com/user-attachments/assets/dad4db30-7e05-4370-a9bf-242ec75ee6b7" />


you can:

* explore the crater in 3d and inspect its terrain, slopes, and elevation
* see live **xyz coordinates** as you move across the terrain
* place waypoints and build eva routes directly on the surface
* create multiple named routes and compare them visually
* generate routes between points using **a* pathfinding** with shortest, safest, longest, and balanced modes

under the hood, the terrain is converted into a **navigation grid**, where cells are marked as walkable or unwalkable based on slope. the a* algorithm then finds routes through traversable terrain while accounting for elevation and terrain difficulty.

basically, it is a 3d mission-planning tool that lets a crew get familiar with martian terrain and plan eva traverses before actually going out into the field.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
