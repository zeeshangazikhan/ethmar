# Ethmar Homepage CMS Guide (Strapi)

This CMS is built for non-technical editors.

## 1) Start CMS

From project root:

```bash
npm run cms:dev
```

Open admin panel:

`http://localhost:1337/admin`

Note: On startup, default homepage content is auto-seeded and published for both `en` and `ar`.

## 2) First Login Setup

On first run, Strapi asks you to create an admin user.

- First Name
- Last Name
- Email
- Password

After login, you will see `Homepage (Simple Editor)`.

## 3) English + Arabic Editing Flow

Use this exact sequence every time:

1. Open `Content Manager` -> `Homepage (Simple Editor)`
2. Edit locale `English (en)` first
3. Save + Publish
4. Switch locale to `Arabic (ar)` from locale dropdown
5. Add Arabic translation
6. Save + Publish

## 4) What Each Field Means (Easy Names)

- `Hero Banner`: top main heading, button and hero image
- `Legacy Block`: second block below hero (heading + image + optional button)
- `Global Heading Line 1` + `Global Heading Line 2`: heading text above Global Presence slider
- `Global Presence Cards`: cards inside Global Presence slider
- `Featured Sector Block`: large center section with sector title + image + CTA
- `Sectors Heading Line 1` + `Sectors Heading Line 2`: heading text above sectors block
- `Sectors Cards Heading`: title shown above sector cards slider
- `Sectors Cards`: all sector cards (repeatable)
- `Partnership Heading`: partnership logos heading
- `Partnership Logos`: partner logos list (repeatable)
- `Final CTA`: final section title, text, and button

## 5) Editor-Friendly Tips

- Keep titles short (best readability on mobile)
- Fill image alt text for accessibility
- Use web-safe links (example: `/en/contact-us`)
- Publish both locales to keep site consistent

## 6) API Endpoint For Frontend

Use this endpoint to fetch homepage with all nested data:

`GET http://localhost:1337/api/homepage?locale=en&populate[heroBanner][populate]=*&populate[legacyBlock][populate]=*&populate[globalPresenceCards][populate]=*&populate[featuredSectorBlock][populate]=*&populate[sectorsCards][populate]=*&populate[partnershipLogos][populate]=*&populate[finalCta][populate]=*`

Arabic version:

`GET http://localhost:1337/api/homepage?locale=ar&populate[heroBanner][populate]=*&populate[legacyBlock][populate]=*&populate[globalPresenceCards][populate]=*&populate[featuredSectorBlock][populate]=*&populate[sectorsCards][populate]=*&populate[partnershipLogos][populate]=*&populate[finalCta][populate]=*`

## 7) Public Access Permission (One-time)

If frontend cannot read data:

1. Go to `Settings` -> `Users & Permissions` -> `Roles`
2. Open `Public`
3. In `Homepage`, enable `find`
4. Save
