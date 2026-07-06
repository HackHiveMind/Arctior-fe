import type { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Eroare necunoscuta';
  const stack = error instanceof Error ? error.stack : undefined;

  return (
    <div role="alert" className="flex min-h-screen items-center justify-center bg-ark-purple px-4 py-12 text-white">
      <div className="max-w-lg text-center">
        <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl">A aparut o eroare</h1>
        <p className="mb-6 text-gray-200">
          Am intampinat o problema tehnica. Te rugam sa incerci din nou.
        </p>

        {import.meta.env.DEV && (
          <details className="mb-6 rounded-lg border border-rose-300/30 bg-rose-950/40 p-4 text-left">
            <summary className="cursor-pointer text-sm text-rose-200">Detalii dev</summary>
            <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap text-xs text-rose-100">
              {message}
              {'\n\n'}
              {stack}
            </pre>
          </details>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="rounded-lg bg-ark-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-ark-purple"
          >
            Incearca din nou
          </button>
          <a
            href="/"
            className="rounded-lg border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white"
          >
            Acasa
          </a>
        </div>
      </div>
    </div>
  );
}
