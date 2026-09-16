# Space-D Infra Developers

Next.js website using React, Tailwind CSS, and Framer Motion.

## Development

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

The production build downloads the Playfair Display font from Google and requires network access. Run `npm start` to serve the production build.

## Structure

- `app/page.tsx`: server-rendered homepage composition and project loading.
- `components/home/`: individual page sections; interactive state stays in its section.
- `data/home.ts`: values, construction steps, testimonials, and FAQ content.
- `lib/projects.ts`: reads images from `public/projects` and derives accessible image descriptions.
- `lib/enquiries.ts`: loads EmailJS only when an enquiry is submitted.
- `app/globals.css`: Tailwind entry point and global styles.
- `public/`: website media.

Add project images to `public/projects` and rebuild to update the production gallery. Supported extensions: JPG, JPEG, PNG, WebP. Filenames determine titles and alphabetical display order.

EmailJS service, template, and public key are configured in `lib/enquiries.ts`. These are browser-visible identifiers. Verify enquiries with your EmailJS account when changing this integration.
