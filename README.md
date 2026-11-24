# CampusConnect — MSRUAS student-only random chat

A Flask + Socket.IO + WebRTC college community demo with student registration, email OTP verification, random matching, text messaging, video calling, and reporting.

## Run locally
1. Install Python 3.11 or newer.
2. Open Terminal in this folder.
3. Run `python -m venv venv`
4. Activate it: macOS/Linux `source venv/bin/activate`; Windows `venv\Scripts\activate`
5. Run `pip install -r requirements.txt`
6. Run `python app.py`
7. Open `http://127.0.0.1:5000`

## Demo account setup
By default `DEMO_MODE=true`. Register using an address ending in `@msruas.ac.in`; the OTP is displayed on the verification page for classroom demonstration. This is a development-only convenience, not real proof of college enrollment.

## Real email verification before public use
Set `DEMO_MODE=false` and configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM and a strong SECRET_KEY. Use an email provider/app password. Verify that the college domain is actually controlled by the university before relying on it as an access policy. Domain-only verification proves control of that mailbox, not current student status.

## Deployment notes
Deploy to a Python host that supports persistent WebSocket connections (for example Render). Configure environment variables and use a managed PostgreSQL database for multi-instance production. Add HTTPS, rate limiting, moderation/admin review, abuse prevention, privacy notice, age policy and retention controls before real student use.

## Important technical limitations of this academic prototype
- WebRTC uses a public STUN server. For reliable calls across restrictive networks, configure TURN (for example coturn) and add its credentials to `static/chat.js`.
- The in-memory random queue is suitable only for a single server process; it must be moved to Redis for multi-worker production.
- Current report endpoint records reports but does not yet include an admin moderation dashboard.
- This is a prototype and should not be advertised as a secure production service.
