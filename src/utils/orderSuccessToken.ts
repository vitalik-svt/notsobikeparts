import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const ORDER_SUCCESS_COOKIE = 'order_success_token';

const TOKEN_TTL_MS = 15 * 60 * 1000;
const SECRET_FALLBACK = 'dev-only-order-success-secret';

function getSecret() {
    const secretFromEnv = process.env.ORDER_SUCCESS_SECRET;

    if (secretFromEnv) {
        return secretFromEnv;
    }

    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
        throw new Error('ORDER_SUCCESS_SECRET must be set in production');
    }

    // In non-production environments, fall back to a fixed, dev-only secret.
    return SECRET_FALLBACK;
}

function sign(value: string) {
    return createHmac('sha256', getSecret()).update(value).digest('hex');
}

function safeEqual(a: string, b: string) {
    const aa = Buffer.from(a);
    const bb = Buffer.from(b);

    if (aa.length !== bb.length) {
        return false;
    }

    return timingSafeEqual(aa, bb);
}

export function createOrderSuccessToken() {
    const payload = JSON.stringify({
        ts: Date.now(),
        nonce: randomBytes(12).toString('hex'),
    });

    const encoded = Buffer.from(payload).toString('base64url');
    const signature = sign(encoded);

    return `${encoded}.${signature}`;
}

export function verifyOrderSuccessToken(token: string | undefined) {
    if (!token) {
        return false;
    }

    const [encoded, providedSignature] = token.split('.');

    if (!encoded || !providedSignature) {
        return false;
    }

    const expectedSignature = sign(encoded);

    if (!safeEqual(providedSignature, expectedSignature)) {
        return false;
    }

    try {
        const payloadRaw = Buffer.from(encoded, 'base64url').toString('utf8');
        const payload = JSON.parse(payloadRaw) as { ts?: number };

        if (!payload.ts || Number.isNaN(payload.ts)) {
            return false;
        }

        return Date.now() - payload.ts <= TOKEN_TTL_MS;
    } catch {
        return false;
    }
}