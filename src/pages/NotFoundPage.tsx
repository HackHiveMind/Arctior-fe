import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-ark-gold">404</p>
        <h1 className="mb-4 text-4xl text-white sm:text-5xl">Pagina nu a fost gasita</h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-200">
          Linkul folosit nu mai exista sau pagina a fost mutata.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-ark-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-ark-purple transition hover:bg-ark-gold/90"
        >
          Inapoi acasa
        </Link>
      </div>
    </section>
  );
}
