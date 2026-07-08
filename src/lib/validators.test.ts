import { describe, expect, it } from 'vitest';
import { contactSchema, emailSchema, passwordSchema, registerSchema, resetPasswordSchema } from './validators';

describe('validators', () => {
  it('accepta email valid si respinge email invalid', () => {
    expect(emailSchema.safeParse('test@example.com').success).toBe(true);
    expect(emailSchema.safeParse('abc').success).toBe(false);
  });

  it('valideaza reguli minime pentru parola', () => {
    expect(passwordSchema.safeParse('abc').success).toBe(false);
    expect(passwordSchema.safeParse('Abcdefghi123!').success).toBe(true);
  });

  it('valideaza register', () => {
    expect(registerSchema.safeParse({ email: 'test@example.com', password: 'Abcdefghi123!' }).success).toBe(true);
  });

  it('respinge reset cand parolele nu coincid', () => {
    const result = resetPasswordSchema.safeParse({
      password: 'Abcdefghi123!',
      confirmPassword: 'Abcdefghi123?',
    });

    expect(result.success).toBe(false);
  });

  it('valideaza formularul de contact', () => {
    expect(
      contactSchema.safeParse({
        name: 'Ion Popescu',
        contact: 'ion@example.com',
        question: 'Vreau o oferta pentru mobilier la comanda.',
      }).success,
    ).toBe(true);

    expect(
      contactSchema.safeParse({
        name: 'Ion Popescu',
        contact: 'ion@example.com',
        question: '',
      }).success,
    ).toBe(false);
  });

  it('accepta doar email in formularul de contact', () => {
    expect(
      contactSchema.safeParse({
        name: 'Ion Popescu',
        contact: '+373 79 123 456',
        question: 'Vreau o oferta pentru mobilier la comanda.',
      }).success,
    ).toBe(false);
  });
});
