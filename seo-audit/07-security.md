# 07 — Security & Trust Signals

### Summary
The security posture is poor for a medical-device business. No security headers are set at all, the server runs on **end-of-life PHP 7.4.33** (EOL Nov 2022), WordPress `readme.html` and `wp-login.php` are publicly reachable, XML-RPC is exposed, and the site loads a stack of **ancient themes/plugins** with public vulnerabilities (Slider Revolution 5.4.8, Lightbox Plus 2.7.2, FancyBox 1.3.4). A dead staging hostname (`new.gamedical.com.au`) is still referenced in production content.

### Issues Found

| Issue | Severity (Critical/High/Medium/Low) | Affected URLs (sample) | Fix |
|---|---|---|---|
| **Zero security headers** — no `Strict-Transport-Security`, no `Content-Security-Policy`, no `X-Frame-Options`, no `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`. Only `server: LiteSpeed` and `x-powered-by: PHP/7.4.33` are served. | **Critical** | all responses | Set all of the above (CSP, HSTS with `preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`/`DENY`, `Referrer-Policy: strict-origin-when-cross-origin`). |
| **End-of-life PHP 7.4.33** (server `x-powered-by`) — no longer supported, no security patches. | **Critical** | server-wide | Upgrade to a supported PHP (8.2/8.3) and patch the stack. |
| **`readme.html` publicly accessible (HTTP 200)** — discloses WordPress version (core 6.8 identified from asset `?ver=6.8` URLs; theme 2.4.3, Rev 5.4.8, etc.), aiding targeted attacks. | High | `/readme.html` | Block access to `readme.html`, `license.txt`, `wp-config.php` backups, `.git`, etc. |
| **`wp-login.php` reachable (HTTP 200)** with **no rate-limiting/captcha/2FA observed** — a brute-force target. | High | `/wp-login.php` | Add rate limiting, 2FA, rename login URL, and/or block via firewall; monitor login attempts. |
| **XML-RPC exposed** (`x-pingback: .../xmlrpc.php`, `/xmlrpc.php` returns 405 for GET — i.e. enabled for POST). Known vector for amplification/brute-force and pingback abuse. | High | `/xmlrpc.php` | Disable XML-RPC unless genuinely used (Yoast/plugins rarely need it). |
| **Outdated, vulnerable plugins/theme**: Slider Revolution 5.4.8 (public XSS/arbitrary-code CVEs), Lightbox Plus 2.7.2, FancyBox 1.3.4 (2010). The FancyBox JS is also **broken** at runtime (`fancybox is not a function`). | **Critical** | site-wide | Update or remove these plugins/theme. Slider Revolution 5.4.8 in particular has known CVEs. |
| **`http://` links to LinkedIn** (67 references) — insecure social links. Not browser-blocked mixed content (they're `href` links, not embedded resources), but they carry an insecure scheme and should be `https`. | Low | all pages | Change to `https://www.linkedin.com/company/ga-medical`. |
| **Broken Google Maps API key** — `ApiProjectMapError` ("This page can't load Google Maps correctly", "For development purposes only") means a dev/expired key is live. That's a config/trust problem and leaks the API-key choice. | Medium | `/contact/` | Use a production Google Maps API key (or remove the map). |
| **No malware/spam/hidden-text injection observed** — no unexpected external scripts (other than the broken staging image) and no obvious cloaked content in the pages crawled. | Good (no issue) | all | Keep monitoring; the main injection risk is the outdated plugin stack. |

### Not Assessed
- **Certificate detail / chain validity** wasn't checked beyond confirming HTTPS works and redirects to `https://` (301 from http and www). Assume a valid cert given successful HTTPS; full chain/OCSP check not performed.
- **Full CVE/exploit confirmation** for each plugin version wasn't performed; the versions are flagged as known-outdated based on widely documented release history. Recommend a `wpscan`/Sucuri scan.
