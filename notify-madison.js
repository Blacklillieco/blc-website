// api/notify-madison.js
// Add this file to your BLC-Command-Center project on GitHub
// Sends Madison an instant notification email when a new inquiry comes in

import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      subject,
      clientName,
      clientEmail,
      clientBrand,
      service,
      message,
      onyxStatus,
    } = req.body;

    // Set up Gmail OAuth
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Build notification email to Madison
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Georgia', serif; background: #0e0b0b; color: #f2ece0; margin: 0; padding: 0; }
  .wrap { max-width: 600px; margin: 0 auto; padding: 40px 32px; }
  .header { border-bottom: 1px solid rgba(200,169,106,0.3); padding-bottom: 24px; margin-bottom: 32px; }
  .logo { font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #C8A96A; }
  .title { font-size: 28px; font-weight: 300; color: #f2ece0; margin: 12px 0 4px; }
  .subtitle { font-size: 12px; color: rgba(242,236,224,0.5); letter-spacing: 0.1em; }
  .field { padding: 16px 0; border-bottom: 1px solid rgba(200,169,106,0.12); }
  .label { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: #B22222; margin-bottom: 6px; }
  .value { font-size: 14px; color: rgba(242,236,224,0.85); font-weight: 300; }
  .message-box { background: #1f1a1a; border: 1px solid rgba(200,169,106,0.2); padding: 20px; margin-top: 8px; border-radius: 2px; }
  .status { display: inline-block; padding: 6px 14px; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 24px; }
  .status.ok { background: rgba(74,124,89,0.2); color: #4a7c59; border: 1px solid rgba(74,124,89,0.3); }
  .status.fail { background: rgba(178,34,34,0.2); color: #B22222; border: 1px solid rgba(178,34,34,0.3); }
  .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(200,169,106,0.15); font-size: 10px; color: rgba(242,236,224,0.3); text-align: center; letter-spacing: 0.1em; }
  .cta { display: inline-block; margin-top: 24px; padding: 12px 28px; background: #C8A96A; color: #0e0b0b; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">Black Lillie Collective</div>
    <div class="title">New Inquiry 🖤</div>
    <div class="subtitle">Someone wants to work with you</div>
  </div>

  <div class="field">
    <div class="label">Client Name</div>
    <div class="value">${clientName}</div>
  </div>
  <div class="field">
    <div class="label">Email</div>
    <div class="value"><a href="mailto:${clientEmail}" style="color:#C8A96A;">${clientEmail}</a></div>
  </div>
  <div class="field">
    <div class="label">Brand / Business</div>
    <div class="value">${clientBrand || '—'}</div>
  </div>
  <div class="field">
    <div class="label">Service Interested In</div>
    <div class="value">${service || '—'}</div>
  </div>
  <div class="field">
    <div class="label">Their Message</div>
    <div class="message-box">${message || '—'}</div>
  </div>

  <div class="field">
    <div class="label">Onyx Status</div>
    <span class="status ${onyxStatus?.includes('✓') ? 'ok' : 'fail'}">${onyxStatus}</span>
  </div>

  <a href="mailto:${clientEmail}?subject=Re: Your BLC Inquiry&body=Hi ${clientName},%0A%0AThank you for reaching out to Black Lillie Collective!" class="cta">Reply to ${clientName} →</a>

  <div class="footer">
    Black Lillie Collective LLC · blacklilliecollective.com<br>
    This notification was sent automatically by Onyx
  </div>
</div>
</body>
</html>`;

    const rawMessage = [
      `To: madison@blacklilliecollective.com`,
      `From: Black Lillie Collective <madison@blacklilliecollective.com>`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      emailBody,
    ].join('\n');

    const encoded = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Notify error:', err);
    return res.status(500).json({ error: err.message });
  }
}
