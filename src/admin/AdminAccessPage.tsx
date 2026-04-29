import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import AdminDashboard from './AdminDashboard';
import { getApiErrorMessage } from '../api/api';
import adminLogo from '../assets/captura_152357.png';

type AdminAccessPageProps = {
  initialMode?: 'login' | 'register';
};

const AdminAccessPage: React.FC<AdminAccessPageProps> = ({ initialMode = 'login' }) => {
  const { needsSetup, isAuthenticated, isInitializing, login, registerAdmin, token, user } = useAdmin();
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAuthMode(initialMode);
  }, [initialMode]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      await registerAdmin({
        email: registerEmail,
        password: registerPassword,
      });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Nu am putut finaliza inregistrarea.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      await login({
        username: loginUsername,
        password: loginPassword,
      });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Nu am putut face autentificarea.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitializing || needsSetup === null) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-ark-gold/20 bg-black/20 p-6 shadow-2xl shadow-black/30 sm:p-8 md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <img src={adminLogo} alt="Arktior logo" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
            <div className="leading-tight">
              <p className="text-2xl font-bold tracking-tight text-ark-gold sm:text-3xl">ARKTIOR</p>
              <p className="text-[10px] tracking-[0.12em] text-ark-gold/80 sm:text-xs sm:tracking-[0.15em]">FURNITURE &amp; DESIGN</p>
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80 mb-3">Auth</p>
          <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Se incarca starea de autentificare</h1>
          <p className="text-gray-200">Verific backend-ul si sesiunea salvata.</p>
        </div>
      </section>
    );
  }

  const shouldShowRegister = authMode === 'register' || needsSetup;
  const registrationDisabled = !needsSetup;

  return (
      <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
      <div className={`${isAuthenticated ? 'max-w-7xl' : 'max-w-3xl'} mx-auto rounded-2xl border border-ark-gold/20 bg-black/20 p-6 shadow-2xl shadow-black/30 sm:p-8 md:p-10`}>
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={adminLogo} alt="Arktior logo" className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
            <div className="leading-tight">
              <p className="text-2xl font-bold tracking-tight text-ark-gold sm:text-3xl">ARKTIOR</p>
              <p className="text-[10px] tracking-[0.12em] text-ark-gold/80 sm:text-xs sm:tracking-[0.15em]">FURNITURE &amp; DESIGN</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 self-start text-ark-gold border border-ark-gold/40 px-4 py-2 rounded hover:bg-ark-gold hover:text-ark-purple transition"
          >
            Inapoi la site
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="mb-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              to="/admin"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] transition ${
                !shouldShowRegister
                  ? 'bg-ark-gold text-ark-purple'
                  : 'border border-white/10 bg-white/5 text-white hover:border-ark-gold/40'
              }`}
            >
              Login
            </Link>
            <Link
              to="/admin/register"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage('');
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] transition ${
                shouldShowRegister
                  ? 'bg-ark-gold text-ark-purple'
                  : 'border border-white/10 bg-white/5 text-white hover:border-ark-gold/40'
              }`}
            >
              Register
            </Link>
          </div>
        )}

        {shouldShowRegister && !isAuthenticated && (
          <>
            <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80 mb-3">Register</p>
            <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Creeaza contul de admin</h1>
            <p className="text-gray-200 max-w-2xl leading-relaxed mb-8">
              Creezi primul cont real cu email si parola, apoi intri direct in sesiunea de administrare.
            </p>

            {registrationDisabled ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-gray-200">
                  Exista deja un cont admin configurat. Pagina de register este disponibila doar pentru primul cont, iar de aici mergi mai departe cu login.
                </p>
                <Link
                  to="/admin"
                  onClick={() => setAuthMode('login')}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ark-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-ark-purple transition hover:bg-ark-gold/90"
                >
                  Mergi la login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  placeholder="Email"
                  className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
                />
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                  placeholder="Parola"
                  className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-ark-gold px-6 py-3 font-bold uppercase tracking-[0.25em] text-ark-purple transition hover:bg-ark-gold/90"
                >
                  {isSubmitting ? 'Se creeaza contul...' : 'Register si intra'}
                </button>
              </form>
            )}
          </>
        )}

        {!shouldShowRegister && !isAuthenticated && (
          <>
            <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80 mb-3">Admin Login</p>
            <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Autentificare</h1>
            <p className="text-gray-200 max-w-2xl leading-relaxed mb-8">
              Introdu emailul sau username-ul si parola pentru a activa modul de editare in frontend.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                value={loginUsername}
                onChange={(event) => setLoginUsername(event.target.value)}
                placeholder="Email sau username"
                className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
              />
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder="Parola"
                className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-ark-gold"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-ark-gold px-6 py-3 font-bold uppercase tracking-[0.25em] text-ark-purple transition hover:bg-ark-gold/90"
              >
                {isSubmitting ? 'Se autentifica...' : 'Intra in admin'}
              </button>
            </form>
          </>
        )}

        {!needsSetup && isAuthenticated && (
          <>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300 mb-3">Admin activ</p>
            <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Panou de administrare</h1>
            <p className="text-gray-200 max-w-2xl leading-relaxed mb-6">
              Din pagina asta poti edita categoriile si poti adauga produse noi fara sa mai intri pe pagina publica.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-2">Cont curent</p>
              <p className="text-sm text-white">{user?.username}</p>
              <p className="mt-2 font-mono break-all text-xs text-white/60">{token}</p>
            </div>
            <AdminDashboard />
          </>
        )}

        {errorMessage && <p className="mt-6 text-sm text-rose-300">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default AdminAccessPage;
