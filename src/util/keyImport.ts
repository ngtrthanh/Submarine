export const MAX_KEY_FILE_SIZE = 128 * 1024;

// This only checks the file envelope. The existing Rust save/connect paths
// remain responsible for validating and decoding the key itself.
export function normalizePrivateKey(raw: string): string {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
  if (text.startsWith('PuTTY-User-Key-File-')) {
    throw new Error('PuTTY .ppk is not supported. Export an OpenSSH private key with PuTTYgen first.');
  }
  if (/^(ssh-|ecdsa-|sk-)/.test(text)) {
    throw new Error('This is a public key. Select the private-key file (usually without .pub).');
  }
  const match = text.match(/^-----BEGIN (OPENSSH|RSA) PRIVATE KEY-----\n/);
  if (!match || !text.endsWith(`-----END ${match[1]} PRIVATE KEY-----`)) {
    throw new Error('Select an OpenSSH or RSA PEM private-key file. Other formats must be converted to OpenSSH first.');
  }
  if (text.includes('\0')) throw new Error('The selected file is not a text private key.');
  return text + '\n';
}
