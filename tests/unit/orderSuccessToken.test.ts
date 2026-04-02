import { createHmac } from 'node:crypto';

import {
  createOrderSuccessToken,
  verifyOrderSuccessToken,
} from '@/utils/orderSuccessToken';

const DEV_SECRET = `dev-only-order-success-secret`;

function signedToken(payloadStr: string) {
    const encoded = Buffer.from(payloadStr).toString(`base64url`);
    const sig = createHmac(`sha256`, DEV_SECRET).update(encoded).digest(`hex`);
    return `${encoded}.${sig}`;
}

describe(`orderSuccessToken`, () => {
  test(`creates token that verifies as valid`, () => {
    const token = createOrderSuccessToken();
    expect(verifyOrderSuccessToken(token)).toBe(true);
  });

  test(`rejects undefined`, () => {
    expect(verifyOrderSuccessToken(undefined)).toBe(false);
  });

  test(`rejects malformed token`, () => {
    expect(verifyOrderSuccessToken(`not-a-valid-token`)).toBe(false);
  });

  test(`rejects tampered token`, () => {
    const token = createOrderSuccessToken();
    const tampered = `${token}x`;

    expect(verifyOrderSuccessToken(tampered)).toBe(false);
  });

  test(`rejects token with invalid base64 payload`, () => {
    // valid structure but garbage base64
    expect(verifyOrderSuccessToken(`!!invalid_base64!!.somesig`)).toBe(false);
  });

  test(`rejects expired token`, () => {
    // Mock Date.now to simulate token created 16 minutes ago
    const past = Date.now() - 16 * 60 * 1000;
    vi.spyOn(Date, `now`).mockReturnValueOnce(past).mockReturnValueOnce(past);
    const token = createOrderSuccessToken();
    vi.restoreAllMocks();

    expect(verifyOrderSuccessToken(token)).toBe(false);
  });

  test(`uses ORDER_SUCCESS_SECRET from env when set`, () => {
    process.env.ORDER_SUCCESS_SECRET = `my-test-secret`;
    const token = createOrderSuccessToken();
    expect(verifyOrderSuccessToken(token)).toBe(true);
    delete process.env.ORDER_SUCCESS_SECRET;
  });

  test(`throws in production when ORDER_SUCCESS_SECRET is missing`, () => {
    vi.stubEnv(`NODE_ENV`, `production`);
    vi.stubEnv(`ORDER_SUCCESS_SECRET`, ``);

    expect(() => createOrderSuccessToken()).toThrow(`ORDER_SUCCESS_SECRET must be set in production`);

    vi.unstubAllEnvs();
  });

  test(`rejects token with valid signature but missing ts in payload`, () => {
    const token = signedToken(`{}`);
    expect(verifyOrderSuccessToken(token)).toBe(false);
  });

  test(`rejects token with valid signature but invalid JSON payload`, () => {
    const token = signedToken(`not-valid-json`);
    expect(verifyOrderSuccessToken(token)).toBe(false);
  });
});