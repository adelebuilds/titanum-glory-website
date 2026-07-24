import assert from "node:assert/strict";
import test from "node:test";
import { createEnquiryEmail, SERVICE_NAMES, validateContactPayload } from "./contact.js";

const validPayload = {
  name: "Adele Tan",
  company: "Example Shipping",
  email: "adele@example.com",
  country: "Malaysia",
  service: SERVICE_NAMES[0],
  serviceDetails: "",
  message: "Please advise on the required documents.",
};

test("accepts every service offered by the website form", () => {
  for (const service of SERVICE_NAMES) {
    const payload = {
      ...validPayload,
      service,
      serviceDetails: service === "Other" ? "A different maritime enquiry" : "",
    };
    const result = validateContactPayload(payload);
    assert.deepEqual(result.data, payload);
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

test("requires details only when Other is selected", () => {
  const missingDetails = validateContactPayload({
    ...validPayload,
    service: "Other",
    serviceDetails: " ",
  });
  const standardOption = validateContactPayload({
    ...validPayload,
    service: "Marine Insurance",
    serviceDetails: "",
  });

  assert.equal(missingDetails.error, "Please specify how we can help you.");
  assert.equal(standardOption.error, undefined);
});

test("includes Other details in the enquiry email", () => {
  const email = createEnquiryEmail({
    ...validPayload,
    service: "Other",
    serviceDetails: "Port documentation advice",
  });

  assert.match(email.text, /Please specify: Port documentation advice/);
  assert.match(email.html, /<strong>Please specify<\/strong>/);
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
