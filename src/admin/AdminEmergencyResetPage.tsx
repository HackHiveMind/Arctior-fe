import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { emergencyResetAdmins, getApiErrorMessage } from '../api/api';
import adminLogo from '../assets/captura_152357.png';
import { type FormErrors, emergencyResetSchema, toFormErrors } from '../lib/validators';

const CONFIRM_PHRASE = 'STERGE TOTI ADMINII';

const AdminEmergencyResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = emergencyResetSchema.safeParse({ email, password, recoveryToken, confirmText });

    if (!validation.success) {
      setFieldErrors(toFormErrors(validation.error));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await emergencyResetAdmins({
        email: validation.data.email,
        password: validation.data.password,
        recoveryToken: validation.data.recoveryToken,
      });
      setErrorMessage('');
      setFieldErrors({});
      setSuccessMessage(`Admin resetat: ${response.user.username}. Acum poti intra cu parola noua.`);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(getApiErrorMessage(error, 'Nu am putut reseta userii admin.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-rose-300/30 bg-black/20 p-6 shadow-2xl shadow-black/30 sm:p-8 md:p-10">
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

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-rose-300">Emergency</p>
        <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Reset admin users</h1>
        <p className="mb-8 max-w-2xl leading-relaxed text-gray-200">
          Foloseste pagina asta doar daca nu mai stii contul de admin. Actiunea sterge toti userii admin existenti si creeaza unul nou.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="emergency-email" className="mb-2 block text-sm text-gray-200">Email admin nou</label>
            <input
              id="emergency-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'emergency-email-error' : undefined}
              className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
            />
            {fieldErrors.email && <p id="emergency-email-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="emergency-password" className="mb-2 block text-sm text-gray-200">Parola noua</label>
            <input
              id="emergency-password"
              type="password"
              minLength={12}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'emergency-password-error' : undefined}
              className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
            />
            {fieldErrors.password && <p id="emergency-password-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.password}</p>}
          </div>
          <div>
            <label htmlFor="emergency-token" className="mb-2 block text-sm text-gray-200">Recovery token</label>
            <input
              id="emergency-token"
              type="password"
              value={recoveryToken}
              onChange={(event) => setRecoveryToken(event.target.value)}
              aria-invalid={Boolean(fieldErrors.recoveryToken)}
              aria-describedby={fieldErrors.recoveryToken ? 'emergency-token-error' : undefined}
              className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
            />
            {fieldErrors.recoveryToken && <p id="emergency-token-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.recoveryToken}</p>}
          </div>
          <div>
            <label htmlFor="emergency-confirm" className="mb-2 block text-sm text-gray-200">
              Scrie exact: <span className="font-mono text-rose-200">{CONFIRM_PHRASE}</span>
            </label>
            <input
              id="emergency-confirm"
              type="text"
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              aria-invalid={Boolean(fieldErrors.confirmText)}
              aria-describedby={fieldErrors.confirmText ? 'emergency-confirm-error' : undefined}
              className="w-full rounded-lg border border-rose-300/40 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-rose-200"
            />
            {fieldErrors.confirmText && <p id="emergency-confirm-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.confirmText}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || confirmText !== CONFIRM_PHRASE}
            className="w-full rounded-lg bg-rose-300 px-6 py-3 font-bold uppercase tracking-[0.25em] text-ark-purple transition hover:bg-rose-200 disabled:opacity-60"
          >
            {isSubmitting ? 'Se reseteaza...' : 'Reseteaza adminii'}
          </button>
        </form>

        {successMessage && <p className="mt-6 text-sm text-emerald-300">{successMessage}</p>}
        {errorMessage && <p className="mt-6 text-sm text-rose-300">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default AdminEmergencyResetPage;
