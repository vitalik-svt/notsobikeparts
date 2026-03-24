import {
  createOrderSuccessToken,
  verifyOrderSuccessToken,
} from '@/utils/orderSuccessToken';

describe('orderSuccessToken', () => {
  test('creates token that verifies as valid', () => {
    const token = createOrderSuccessToken();
    expect(verifyOrderSuccessToken(token)).toBe(true);
  });

  test('rejects malformed token', () => {
    expect(verifyOrderSuccessToken('not-a-valid-token')).toBe(false);
  });

  test('rejects tampered token', () => {
    const token = createOrderSuccessToken();
    const tampered = `${token}x`;

    expect(verifyOrderSuccessToken(tampered)).toBe(false);
  });
});