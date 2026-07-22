import { createEnquiryEmail, validateContactPayload } from "../server/contact.js";

function sendJson(response, status, body) {
  response.status(status).setHeader("Content-Type", "application/json; charset=utf-8").json(body);
}

function isSameOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers["x-forwarded-host"] || request.headers.host;

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  if (!isSameOrigin(request)) {
    return sendJson(response, 403, { error: "This request could not be accepted." });
  }

  let payload;
  try {
    payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    return sendJson(response, 400, { error: "The enquiry could not be read. Please check the form and try again." });
  }

  // Silently accept honeypot submissions so automated senders get no useful signal.
  if (payload?.website) {
    return sendJson(response, 200, { success: true });
  }

  const validation = validateContactPayload(payload);
  if (validation.error) {
    return sendJson(response, 400, { error: validation.error });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form email environment variables are not configured.");
    return sendJson(response, 503, { error: "The enquiry service is temporarily unavailable. Please try again later." });
  }

  const email = createEnquiryEmail(validation.data);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: validation.data.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      signal: controller.signal,
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error("Resend rejected a contact enquiry:", resendResponse.status, details);
      return sendJson(response, 502, { error: "We could not send your enquiry. Please try again shortly." });
    }

    return sendJson(response, 200, { success: true });
  } catch (error) {
    console.error("Contact enquiry delivery failed:", error);
    return sendJson(response, 502, { error: "We could not send your enquiry. Please try again shortly." });
  } finally {
    clearTimeout(timeout);
  }
}
