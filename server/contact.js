export const SERVICE_NAMES = [
  "Malaysian Seafarer ID support",
  "Certificate of Recognition support",
  "Medical booklet procurement support",
  "Education certificate recognition support",
  "SID collection and CDC stamping support",
  "Courier coordination",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  country: 100,
  service: 100,
  message: 5000,
};

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(payload) {
  const data = Object.fromEntries(
    Object.keys(FIELD_LIMITS).map((field) => [field, clean(payload?.[field])]),
  );

  if (!data.name || !data.email || !data.country || !data.service || !data.message) {
    return { error: "Please complete all required fields." };
  }

  if (Object.entries(FIELD_LIMITS).some(([field, limit]) => data[field].length > limit)) {
    return { error: "One or more fields exceed the allowed length." };
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!SERVICE_NAMES.includes(data.service)) {
    return { error: "Please select a valid service." };
  }

  return { data };
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

export function createEnquiryEmail(data) {
  const safe = Object.fromEntries(
    Object.entries(data).map(([field, value]) => [field, escapeHtml(value)]),
  );
  const company = safe.company || "Not provided";

  return {
    subject: `New website enquiry: ${data.service}`,
    text: [
      "A new enquiry was submitted through the Titanum Glory website.",
      "",
      `Name: ${data.name}`,
      `Company: ${data.company || "Not provided"}`,
      `Email: ${data.email}`,
      `Country: ${data.country}`,
      `Service required: ${data.service}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),
    html: `
      <h2>New website enquiry</h2>
      <p>A new enquiry was submitted through the Titanum Glory website.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${safe.name}</td></tr>
        <tr><td><strong>Company</strong></td><td>${company}</td></tr>
        <tr><td><strong>Email</strong></td><td>${safe.email}</td></tr>
        <tr><td><strong>Country</strong></td><td>${safe.country}</td></tr>
        <tr><td><strong>Service required</strong></td><td>${safe.service}</td></tr>
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap">${safe.message}</p>
    `,
  };
}
