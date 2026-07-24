import assert from "node:assert/strict";
import test from "node:test";
import { createEnquiryEmail, SERVICE_NAMES, validateContactPayload } from "./contact.js";

const validPayload = {
  name: "Adele Tan",
  company: "Example Shipping",
  email: "adele@example.com",
  country: "Malaysia",
  service: SERVICE_NAMES[0],
  message: "Please advise on the required documents.",
};

test("accepts every service offered by the website form", () => {
  for (const service of SERVICE_NAMES) {
    const result = validateContactPayload({ ...validPayload, service });
    assert.deepEqual(result.data, { ...validPayload, service });
  }
});

test("rejects missing required fields", () => {
  const result = validateContactPayload({ ...validPayload, message: " " });
  assert.equal(result.error, "Please complete all required fields.");
});

test("rejects malformed email addresses", () => {
  const result = validateContactPayload({ ...validPayload, email: "not-an-email" });
  assert.equal(result.error, "Please enter a valid email address.");
});

test("rejects services that are not offered by the website", () => {
  const result = validateContactPayload({ ...validPayload, service: "Unsupported service" });
  assert.equal(result.error, "Please select a valid service.");
});

test("escapes submitted values in the HTML email", () => {
  const email = createEnquiryEmail({
    ...validPayload,
    name: "<script>alert('x')</script>",
    message: "<b>Test</b>",
  });

  assert.doesNotMatch(email.html, /<script>|<b>Test<\/b>/);
  assert.match(email.html, /&lt;script&gt;/);
  assert.match(email.html, /&lt;b&gt;Test&lt;\/b&gt;/);
});
