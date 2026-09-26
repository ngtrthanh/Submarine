import { useEffect, useRef, useState } from 'react';
import { MAX_KEY_FILE_SIZE, normalizePrivateKey } from '../util/keyImport';

type Props = { onImport: (key: string, filename: string) => void };

export default function KeyFileImport({ onImport }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; };
  }, []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [filename, setFilename] = useState('');

  return <div className="space-y-2">
    <input ref={input} type="file" className="hidden" aria-label="Import SSH private key from disk"
      onChange={async event => {
        const file = event.currentTarget.files?.[0];
        event.currentTarget.value = ''; // Allow choosing the same file again.
        if (!file) return;
        setBusy(true);
        setError('');
        setFilename('');
        try {
          if (file.size > MAX_KEY_FILE_SIZE) throw new Error('Key file exceeds the 128 KiB limit.');
          const key = normalizePrivateKey(await file.text());
          if (!active.current) return;
          onImport(key, file.name);
          setFilename(file.name);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Could not read the selected key file.');
        } finally {
          setBusy(false);
        }
      }} />
    <button type="button" disabled={busy} onClick={() => input.current?.click()}
      className="w-full h-10 rounded-lg border border-primary/30 bg-primary/10 text-primary text-[13px] font-semibold disabled:opacity-50">
      {busy ? 'Reading key…' : 'Import private key from disk'}
    </button>
    <p className="text-[12px] text-zinc-400">OpenSSH or RSA PEM; extensionless files are accepted. Import replaces this form’s key and clears its public key and passphrase. Review and Save.</p>
    {filename && <p role="status" className="text-[12px] text-zinc-300 break-all">Loaded: {filename}</p>}
    {error && <p role="alert" className="text-[12px] text-red-400">{error}</p>}
  </div>;
}
