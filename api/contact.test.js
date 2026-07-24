import assert from "node:assert/strict";
import test from "node:test";
import handler from "./contact.js";
import { SERVICE_NAMES } from "../server/contact.js";

const validBody = {
  name: "Adele Tan",
  company: "Example Shipping",
  email: "adele@example.com",
  country: "Malaysia",
  service: SERVICE_NAMES[0],
  message: "Please advise on the required documents.",
};

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function createRequest(body = validBody) {
  return {
    method: "POST",
    body,
    headers: {
      host: "titanumglory.com",
      origin: "https://titanumglory.com",
    },
  };
}

test("returns a helpful error when email delivery is not configured", async () => {
  const previous = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  };

  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;

  try {
    const response = createResponse();
    await handler(createRequest(), response);
    assert.equal(response.statusCode, 503);
    assert.equal(response.body.error, "The enquiry service is temporarily unavailable. Please try again later.");
  } finally {
    Object.entries(previous).forEach(([key, value]) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  }
});

test("sends a validated enquiry without exposing credentials", async () => {
  const previousFetch = globalThis.fetch;
  const previous = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  };
  let deliveryRequest;

  process.env.RESEND_API_KEY = "test-secret-key";
  process.env.CONTACT_TO_EMAIL = "team@example.com";
  process.env.CONTACT_FROM_EMAIL = "Titanum Glory <enquiries@example.com>";
  globalThis.fetch = async (url, options) => {
    deliveryRequest = { url, options };
    return { ok: true };
  };

  try {
    const response = createResponse();
    await handler(createRequest(), response);

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { success: true });
    assert.equal(deliveryRequest.url, "https://api.resend.com/emails");
    assert.equal(deliveryRequest.options.headers.Authorization, "Bearer test-secret-key");

    const emailPayload = JSON.parse(deliveryRequest.options.body);
    assert.equal(emailPayload.reply_to, validBody.email);
    assert.equal(emailPayload.to[0], "team@example.com");
    assert.doesNotMatch(deliveryRequest.options.body, /test-secret-key/);
  } finally {
    globalThis.fetch = previousFetch;
    Object.entries(previous).forEach(([key, value]) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  }
});

test("rejects cross-origin submissions", async () => {
  const request = createRequest();
  request.headers.origin = "https://example.net";
  const response = createResponse();

  await handler(request, response);

  assert.equal(response.statusCode, 403);
  assert.equal(response.body.error, "This request could not be accepted.");
});
