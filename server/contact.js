export const SERVICE_NAMES = [
  "Malaysian Maritime Documentation",
  "Marine Insurance",
  "Certificate of Recognition (COR)",
  "MSID (Malaysian Seafarer's Identity Document)",
  "EDUCOR",
  "GOC Endorsement",
  "Medical Booklet Procurement",
  "Regulatory & Compliance Support",
  "Crew Documentation & Certification",
  "Consultation / Not Sure Yet",
  "Other",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  country: 100,
  service: 100,
  serviceDetails: 200,
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

  if (data.service === "Other" && !data.serviceDetails) {
    return { error: "Please specify how we can help you." };
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
  const serviceDetails = safe.serviceDetails || "Not provided";

  return {
    subject: `New website enquiry: ${data.service}`,
    text: [
      "A new enquiry was submitted through the Titanum Glory website.",
      "",
      `Name: ${data.name}`,
      `Company: ${data.company || "Not provided"}`,
      `Email: ${data.email}`,
      `Country: ${data.country}`,
      `How can we help you?: ${data.service}`,
      ...(data.service === "Other" ? [`Please specify: ${data.serviceDetails}`] : []),
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
        <tr><td><strong>How can we help you?</strong></td><td>${safe.service}</td></tr>
        ${data.service === "Other" ? `<tr><td><strong>Please specify</strong></td><td>${serviceDetails}</td></tr>` : ""}
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap">${safe.message}</p>
    `,
  };
}
