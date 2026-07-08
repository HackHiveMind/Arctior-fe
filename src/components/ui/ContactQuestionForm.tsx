import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { getApiErrorMessage, submitContactRequest } from '../../api/api';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { contactSchema, type FormErrors, toFormErrors } from '../../lib/validators';

const ContactQuestionForm: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [question, setQuestion] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = contactSchema.safeParse({ name, contact, question });
    if (!validation.success) {
      setFieldErrors(toFormErrors(validation.error));
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactRequest(validation.data);
      setName('');
      setContact('');
      setQuestion('');
      setFieldErrors({});
      showToast({
        title: t('contactForm.successTitle'),
        description: t('contactForm.successDescription'),
        variant: 'success',
      });
    } catch (error) {
      showToast({
        title: t('contactForm.errorTitle'),
        description: getApiErrorMessage(error, t('contactForm.errorDescription')),
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-gray-200">
          {t('contactForm.name')}
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder={t('contactForm.namePlaceholder')}
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
          className="w-full rounded-lg border border-ark-gold/25 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-ark-gold focus:bg-white/[0.07]"
        />
        {fieldErrors.name && <p id="contact-name-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-method" className="mb-2 block text-sm text-gray-200">
          {t('contactForm.contact')}
        </label>
        <input
          id="contact-method"
          type="email"
          autoComplete="email"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          aria-invalid={Boolean(fieldErrors.contact)}
          aria-describedby={fieldErrors.contact ? 'contact-method-error' : undefined}
          className="w-full rounded-lg border border-ark-gold/25 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-ark-gold focus:bg-white/[0.07]"
        />
        {fieldErrors.contact && <p id="contact-method-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.contact}</p>}
      </div>

      <div>
        <label htmlFor="contact-question" className="mb-2 block text-sm text-gray-200">
          {t('contactForm.question')}
        </label>
        <textarea
          id="contact-question"
          placeholder={t('contactForm.questionPlaceholder')}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={5}
          aria-invalid={Boolean(fieldErrors.question)}
          aria-describedby={fieldErrors.question ? 'contact-question-error' : undefined}
          className="w-full resize-none rounded-lg border border-ark-gold/25 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-ark-gold focus:bg-white/[0.07]"
        />
        {fieldErrors.question && <p id="contact-question-error" role="alert" className="mt-2 text-sm text-rose-300">{fieldErrors.question}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-ark-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-ark-purple transition hover:bg-ark-gold/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send size={18} aria-hidden="true" />
        {isSubmitting ? t('contactForm.sending') : t('contactForm.submit')}
      </button>
    </form>
  );
};

export default ContactQuestionForm;
