import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "crypto";

// All secrets derive from one server-side value (APP_SECRET, set in Vercel).
// It is never stored in the database, so a database leak alone cannot be used
// to guess short PINs offline.

function appSecret(): string {
  const secret = process.env.APP_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("APP_SECRET is not configured (it needs 32+ characters).");
  }
  return secret;
}

function subkey(label: string): Buffer {
  return createHmac("sha256", appSecret()).update(`calldrive:${label}`).digest();
}

function scrypt(password: Buffer, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, 32, { N: 16384, r: 8, p: 1 }, (err, key) =>
      err ? reject(err) : resolve(key)
    );
  });
}

function prehash(plain: string): Buffer {
  return createHmac("sha256", subkey("secret-pepper")).update(plain).digest();
}

/** Salted, peppered, slow hash for PINs and manager codes. */
export async function hashSecret(plain: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(prehash(plain), salt);
  return `s1$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifySecret(plain: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "s1") return false;
  const salt = Buffer.from(parts[1], "base64");
  const expected = Buffer.from(parts[2], "base64");
  const actual = await scrypt(prehash(plain), salt);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

let dummyHash: Promise<string> | null = null;

/** Spends the same time as a real check, so a missing account isn't detectable by timing. */
export async function burnVerifyTime(plain: string): Promise<void> {
  if (!dummyHash) dummyHash = hashSecret("calldrive-dummy");
  await verifySecret(plain, await dummyHash);
}

/** Signs a small payload into a tamper-proof, expiring token (for session cookies). */
export function signToken(payload: Record<string, unknown>, ttlSeconds: number): string {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds })
  ).toString("base64url");
  const sig = createHmac("sha256", subkey("session")).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken<T extends Record<string, unknown>>(
  token: string | undefined | null
): (T & { exp: number }) | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", subkey("session")).update(body).digest();
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * A fingerprint of an employee's current PIN hash. It rides inside their session
 * cookie, so resetting the PIN (or deleting the employee) ends every session
 * that was already signed in.
 */
export function sessionKeyFor(pinHash: string): string {
  return createHmac("sha256", subkey("session-key")).update(pinHash).digest("hex").slice(0, 16);
}

/** Short random code that identifies a dealership on the employee sign-in page. */
export function newAccessSlug(): string {
  return randomBytes(5).toString("hex");
}
