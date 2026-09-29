# RB Consultant

RB Consultant is a React website for an accounting and business-services consultancy. It introduces the firm, presents its services and partners, and lets prospective clients send an enquiry through a contact form.

## Features

- Responsive landing page with Home, About, Services, Team, Partners, and Contact sections
- Rotating hero slides and a services carousel
- Accounting services covering bookkeeping, tax returns, VAT, payroll, tax planning, and company formation
- Contact form with required-field validation and EmailJS delivery
- Partner and business branding assets

## Tech stack

- React 19 (Create React App / `react-scripts`)
- Tailwind CSS with PostCSS and Autoprefixer, plus Sass
- EmailJS (`emailjs-com`) for contact-form delivery

## Requirements

- Node.js 18+ and npm

## Run locally

Install dependencies and start the development server:

```sh
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The development server reloads when source files change.

## Available commands

```sh
npm start       # Start the development server
npm test        # Run the test suite in watch mode
npm run build   # Create an optimized production build in build/
```

The contact form sends submissions using EmailJS. To change the email service or template, update `SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`, and `TO_EMAIL` at the top of `src/Components/Main/Contact.js` and make sure the selected template accepts the form's `name`, `email`, `phone`, and `message` fields.

## Project structure

```text
src/
  App.js                 App entry component
  index.css              Tailwind directives and global styles
  Components/
    home.js              Main landing page and site sections
    Main/Contact.js      Contact form and EmailJS submission
    Main/Header.js       Header component
  Images/                Logos and partner imagery
  Style/main.css         Main application styles
public/                  Static HTML and public assets
build/                   Generated production output (git-ignored)
```

## Production build

Run `npm run build` to generate the static production site in `build/`. Deploy the contents of that directory to a static web host. Rebuild after source changes; the generated build output is not the source of truth.
