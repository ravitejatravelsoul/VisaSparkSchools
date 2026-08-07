# Release Configuration — Owner Actions Required

None of the values below are secrets committed to this repository. This file lists **what the
project owner must configure in Vercel/Supabase dashboards before or during production release**
of this expansion. No item here was performed during this session.

## 1. Supabase migration

- Review `supabase/migrations/0007_*.sql` (added this session, not applied) and apply it to the
  live project via `supabase db push` (or the dashboard SQL editor) once reviewed.

## 2. Cloudflare Turnstile

- Create a Turnstile site at the Cloudflare dashboard for `visasparkschools.vercel.app` (and any
  preview domains).
- Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the public site key) to Vercel Production + Preview
  environment variables.
- In the **Supabase Authentication → Bot and Abuse Protection** settings, enable "Enable Captcha
  protection," select Turnstile, and paste the **Turnstile secret key** there (never in Vercel,
  never in this repo).

## 3. Custom SMTP + sending domain (required for the branded "VS Schools" sender)

- Choose an SMTP provider (not selected in this session).
- Verify a sending domain (SPF, DKIM, and ideally DMARC DNS records) for that provider.
- In **Supabase Authentication → SMTP Settings**, configure: host, port, username, password,
  sender email (e.g. `no-reply@<verified-domain>`), sender name `VS Schools`.
- Without this, Supabase's built-in mailer will keep sending from its own default address
  regardless of the HTML template content.

## 4. Install the branded confirmation-email template

- In **Supabase Authentication → Email Templates → Confirm signup**, paste the HTML from
  `emails/confirm-signup.html` (this repo) and set the subject to "Confirm your email for VS
  Schools." A plain-text fallback lives at `emails/confirm-signup.txt`.
- Test delivery/rendering in Gmail, Outlook, a mobile mail client, and dark mode before relying on
  it (checklist in `docs/product-expansion/EMAIL_TESTING_CHECKLIST.md`).

## 5. VisaSpark URL

- Provide the real VisaSpark website URL. Add it as `NEXT_PUBLIC_VISASPARK_URL` in Vercel
  Production + Preview. Until set, the Study Abroad pages show a non-clickable "coming soon"
  state instead of a guessed link.

## 6. New environment variables summary (names only, no values)

| Variable                         | Required for          | Notes                            |
| -------------------------------- | --------------------- | -------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Signup CAPTCHA widget | Public key only                  |
| `NEXT_PUBLIC_VISASPARK_URL`      | Study Abroad CTA      | Optional; safe fallback if unset |

Existing variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_SITE_URL`) are unchanged and already configured per the prior deployment session.

## 7. Deployment sequence (once the above is configured)

1. Apply migration `0007` to production Supabase.
2. Configure Turnstile (site key in Vercel, secret key in Supabase Auth).
3. Configure custom SMTP + verify domain in Supabase Auth.
4. Install the branded email template in Supabase Auth.
5. Add `NEXT_PUBLIC_VISASPARK_URL` (when available) to Vercel.
6. Push the reviewed local commits to `origin/main`.
7. Wait for GitHub Actions (`quality` + `e2e`) to pass.
8. Deploy to Vercel production.
9. Perform live production verification (equivalent to the checklist used in the prior deployment
   session), including a real signup → Turnstile → branded email → confirmation → certificate
   issuance → PDF/QR verification pass.

None of steps 1-9 were performed this session, per the explicit no-push/no-deploy instruction.
