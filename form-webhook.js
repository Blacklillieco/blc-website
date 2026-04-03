// api/form-webhook.js
// Sits on blc-website (Vercel)
// Formspree sends a webhook here when contact form is submitted
// This triggers Onyx to send welcome email to client + notifies Madison

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // Extract fields from Formspree webhook payload
    const clientName  = body.name  || body.data?.name  || 'New Client';
    const clientEmail = body.email || body.data?.email || '';
    const clientBrand = body.brand || body.data?.brand || '';
    const service     = body.service || body.data?.service || 'General Inquiry';
    const message     = body.message || body.data?.message || '';

    if (!clientEmail) {
      return res.status(400).json({ error: 'No client email found in webhook payload' });
    }

    // ── 1. Trigger Onyx to send welcome email to client ──────────────────
    const onyxRes = await fetch(
      `${process.env.COMMAND_CENTER_URL}/api/send-client-email`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail,
          clientName,
          clientCompany: clientBrand,
          type: 'welcome',
        }),
      }
    );

    const onyxData = await onyxRes.json().catch(() => ({}));

    // ── 2. Send Madison an instant notification email via Gmail API ───────
    const notifyRes = await fetch(
      `${process.env.COMMAND_CENTER_URL}/api/notify-madison`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `🖤 New BLC Inquiry — ${clientName}`,
          clientName,
          clientEmail,
          clientBrand,
          service,
          message,
          onyxStatus: onyxRes.ok ? 'Welcome email sent ✓' : 'Welcome email FAILED ✗',
        }),
      }
    );

    return res.status(200).json({
      success: true,
      client: clientEmail,
      onyxTriggered: onyxRes.ok,
      madisonNotified: notifyRes.ok,
    });

  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err.message });
  }
}
