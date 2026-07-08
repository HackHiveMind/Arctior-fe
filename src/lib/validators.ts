import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email-ul este obligatoriu')
  .email('Format email invalid');

export const usernameSchema = z
  .string()
  .trim()
  .min(1, 'Email-ul sau username-ul este obligatoriu')
  .max(120, 'Valoarea este prea lunga');

export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, 'Parola este obligatorie'),
});

export const passwordSchema = z
  .string()
  .min(12, 'Parola trebuie sa aiba minim 12 caractere')
  .max(128, 'Parola este prea lunga')
  .regex(/[A-Z]/, 'Adauga cel putin o litera mare')
  .regex(/[a-z]/, 'Adauga cel putin o litera mica')
  .regex(/[0-9]/, 'Adauga cel putin o cifra')
  .regex(/[^A-Za-z0-9]/, 'Adauga cel putin un simbol');

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  });

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma parola'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Parolele nu coincid',
    path: ['confirmPassword'],
  });

export const recoverySchema = z.object({
  email: emailSchema,
});

export const emergencyResetSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  recoveryToken: z.string().trim().min(1, 'Recovery token este obligatoriu'),
  confirmText: z.literal('STERGE TOTI ADMINII', 'Scrie exact fraza de confirmare'),
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Numele este obligatoriu')
    .max(120, 'Numele este prea lung'),
  contact: z
    .string()
    .trim()
    .min(1, 'Emailul este obligatoriu')
    .email('Introdu o adresa de email valida')
    .max(160, 'Emailul este prea lung'),
  question: z
    .string()
    .trim()
    .min(1, 'Intrebarea este obligatorie')
    .max(2000, 'Intrebarea este prea lunga'),
});

export type FormErrors = Record<string, string>;

export function toFormErrors(error: z.ZodError): FormErrors {
  return error.issues.reduce<FormErrors>((errors, issue) => {
    const field = issue.path[0];
    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
    return errors;
  }, {});
}
