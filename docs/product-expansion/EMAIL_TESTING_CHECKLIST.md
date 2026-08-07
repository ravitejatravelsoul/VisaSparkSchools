# Confirmation Email Testing Checklist

Run this after installing `emails/confirm-signup.html`/`.txt` in the hosted Supabase project
(see `RELEASE_CONFIGURATION.md`) and configuring custom SMTP -- not something this session could
execute, since it requires the live project and a real mailbox.

## Rendering

- [ ] Gmail web -- header logo bar, button, and footer render correctly; dark mode readable
- [ ] Gmail mobile app (iOS + Android) -- same
- [ ] Outlook desktop (Word-based rendering engine) -- table layout holds up, button still tappable
- [ ] Outlook.com web
- [ ] Apple Mail (macOS + iOS) -- dark mode readable
- [ ] A generic mobile mail client at a narrow viewport -- no horizontal scroll, button reachable

## Content

- [ ] Subject line reads exactly "Confirm your email for VS Schools"
- [ ] Sender name/address shows the custom-SMTP-configured `VS Schools <no-reply@...>` (only once
      custom SMTP is live -- Supabase's shared mailer cannot show this regardless of template)
- [ ] `{{ .Data.first_name }}` personalization shows the real first name for a normal signup
- [ ] Personalization degrades to the "Hi," fallback gracefully if `first_name` is absent
- [ ] The visible fallback link text matches the button's actual `href`
- [ ] Plain-text fallback (`confirm-signup.txt`) is legible with no HTML artifacts

## Functional

- [ ] Clicking "Confirm my email" from a real inbox lands on `/welcome` with the verified message
- [ ] The same link, clicked a second time, redirects to `/sign-in?confirmation=error` (already used)
- [ ] A deliberately expired link (wait past Supabase's token TTL) shows the same clear error
- [ ] No tracking pixel/external request fires from the email client's network panel
