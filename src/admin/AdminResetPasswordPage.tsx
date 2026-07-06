import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getApiErrorMessage, resetPassword } from '../api/api';
import adminLogo from '../assets/captura_152357.png';
import { type FormErrors, resetPasswordSchema, toFormErrors } from '../lib/validators';

const AdminResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      setErrorMessage('Linkul de resetare nu contine token.');
      return;
    }

    const validation = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      setFieldErrors(toFormErrors(validation.error));
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({ token, password: validation.data.password });
      setErrorMessage('');
      setFieldErrors({});
      setSuccessMessage('Parola a fost schimbata. Poti intra acum in admin.');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(getApiErrorMessage(error, 'Nu am putut schimba parola.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-ark-gold/20 bg-black/20 p-6 shadow-2xl shadow-black/30 sm:p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={adminLogo} alt="Arktior logo" className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
            <div className="leading-tight">
              <p className="text-2xl font-bold tracking-tight text-ark-gold sm:text-3xl">ARKTIOR</p>
              <p className="text-[10px] tracking-[0.12em] text-ark-gold/80 sm:text-xs sm:tracking-[0.15em]">FURNITURE &amp; DESIGN</p>
            </div>
          </div>

          <Link
            to="/admin"
            className="inline-flex items-center gap-2 self-start rounded border border-ark-gold/40 px-4 py-2 text-ark-gold transition hover:bg-ark-gold hover:text-ark-purple"
          >
            Inapoi la login
          </Link>
        </div>

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ark-gold/80">Recovery</p>
        <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Parola noua</h1>
        <p className="mb-8 max-w-2xl leading-relaxed text-gray-200">
          Alege o parola noua pentru contul de admin.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="reset-password" className="mb-2 block text-sm text-gray-200">Parola noua</label>
            <input
              id="reset-password"
              type="password"
              minLength={12}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'reset-password-error' : undefined}
              className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
            />
            {fieldErrors.password && <p id="reset-password-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.password}</p>}
          </div>
          <div>
            <label htmlFor="reset-confirm-password" className="mb-2 block text-sm text-gray-200">Repeta parola</label>
            <input
              id="reset-confirm-password"
              type="password"
              minLength={12}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby={fieldErrors.confirmPassword ? 'reset-confirm-password-error' : undefined}
              className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
            />
            {fieldErrors.confirmPassword && <p id="reset-confirm-password-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-ark-gold px-6 py-3 font-bold uppercase tracking-[0.25em] text-ark-purple transition hover:bg-ark-gold/90"
          >
            {isSubmitting ? 'Se salveaza...' : 'Schimba parola'}
          </button>
        </form>

        {successMessage && <p className="mt-6 text-sm text-emerald-300">{successMessage}</p>}
        {errorMessage && <p className="mt-6 text-sm text-rose-300">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default AdminResetPasswordPage;
