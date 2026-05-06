import axios from 'axios';

export interface PublicUser {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  translations?: TranslationMap;
  createdAt: string;
  updatedAt: string;
  articles?: Article[];
}

export interface Article {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  translations?: TranslationMap;
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  code: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface TranslationFields {
  title: string;
  description: string;
}

export type TranslationMap = Record<string, TranslationFields>;

export interface CredentialsPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface EmergencyAdminResetPayload {
  email: string;
  password: string;
  recoveryToken: string;
}

export interface CreateArticlePayload {
  title?: string;
  image: string;
  description?: string;
  translations?: TranslationMap;
  slug?: string;
}

export interface UpdateArticlePayload {
  title?: string;
  image?: string;
  description?: string;
  translations?: Partial<Record<string, Partial<TranslationFields>>>;
}

export interface UpdateCategoryPayload {
  image?: string;
  title?: string;
  description?: string;
  translations?: Partial<Record<string, Partial<TranslationFields>>>;
}

interface UploadResponse {
  url?: string;
  imageUrl?: string;
  path?: string;
}

interface SetupStatusResponse {
  needsSetup: boolean;
}

interface AuthResponse {
  token: string;
  user: PublicUser;
}

interface MeResponse {
  user: PublicUser;
}

interface ApiErrorBody {
  error?: string;
}

function isUploadResponse(value: unknown): value is UploadResponse {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return 'url' in value || 'imageUrl' in value || 'path' in value;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const DEFAULT_PRODUCTION_API_BASE_URL = 'https://arctior-be.onrender.com';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ??
  (import.meta.env.PROD ? DEFAULT_PRODUCTION_API_BASE_URL : '');

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

function withLanguage(path: string, languageCode?: string): string {
  if (!languageCode) {
    return path;
  }

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}lang=${encodeURIComponent(languageCode)}`;
}

function parseJsonBody<TBody>(rawBody: string, fallbackMessage: string): TBody | null {
  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody) as TBody;
  } catch {
    throw new ApiError(fallbackMessage, 502);
  }
}

async function requestJson<TResponse>(
  path: string,
  init: RequestInit = {},
  token?: string | null,
): Promise<TResponse> {
  const headers = new Headers(init.headers);
  const hasJsonBody = init.body !== undefined && !headers.has('Content-Type');

  if (hasJsonBody) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
  });

  const rawBody = await response.text();
  const parsedBody = parseJsonBody<TResponse | ApiErrorBody>(
    rawBody,
    'Serverul API nu a returnat JSON. Verifica adresa backend-ului.',
  );

  if (!response.ok) {
    const message =
      parsedBody && typeof parsedBody === 'object' && 'error' in parsedBody && parsedBody.error
        ? parsedBody.error
        : 'A aparut o eroare la comunicarea cu serverul.';

    throw new ApiError(message, response.status);
  }

  return parsedBody as TResponse;
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

export async function getSetupStatus(): Promise<SetupStatusResponse> {
  return requestJson<SetupStatusResponse>('/api/auth/setup-status');
}

export async function setupAuth(payload: CredentialsPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/api/auth/setup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerAuth(payload: RegisterPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginAuth(payload: CredentialsPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function requestPasswordReset(payload: ForgotPasswordPayload): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function emergencyResetAdmins(
  payload: EmergencyAdminResetPayload,
): Promise<{ ok: boolean; user: PublicUser }> {
  return requestJson<{ ok: boolean; user: PublicUser }>('/api/auth/emergency-reset-admins', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getAuthenticatedUser(token: string): Promise<MeResponse> {
  return requestJson<MeResponse>('/api/auth/me', {}, token);
}

export async function getLanguages(): Promise<Language[]> {
  return requestJson<Language[]>('/api/languages');
}

export async function getCategories(languageCode?: string): Promise<Category[]> {
  const result = await requestJson<{ data: Category[] }>(withLanguage('/api/categories', languageCode));
  return result.data;
}

export async function getCategoryBySlug(slug: string, languageCode?: string): Promise<Category> {
  return requestJson<Category>(withLanguage(`/api/categories/${encodeURIComponent(slug)}`, languageCode));
}

export async function updateCategory(
  slug: string,
  payload: UpdateCategoryPayload,
  token: string,
): Promise<Category> {
  return requestJson<Category>(
    `/api/categories/${encodeURIComponent(slug)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function createArticle(
  categorySlug: string,
  payload: CreateArticlePayload,
  token: string,
): Promise<Article> {
  return requestJson<Article>(
    `/api/categories/${encodeURIComponent(categorySlug)}/articles`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function updateArticle(
  articleSlug: string,
  payload: UpdateArticlePayload,
  token: string,
): Promise<Article> {
  return requestJson<Article>(
    `/api/articles/${encodeURIComponent(articleSlug)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    token,
  );
}

export async function deleteArticle(articleSlug: string, token: string): Promise<void> {
  const response = await fetch(buildUrl(`/api/articles/${encodeURIComponent(articleSlug)}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const rawBody = await response.text();
    const parsedBody = parseJsonBody<ApiErrorBody>(
      rawBody,
      'Serverul API nu a returnat JSON. Verifica adresa backend-ului.',
    );
    const message = parsedBody?.error ?? 'Nu am putut sterge produsul.';
    throw new ApiError(message, response.status);
  }
}

export async function uploadImage(file: File, token: string): Promise<string> {
  const uploadEndpoint = import.meta.env.VITE_UPLOAD_ENDPOINT ?? '/upload';
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post<UploadResponse>(buildUrl(uploadEndpoint), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    const uploadedUrl = isUploadResponse(response.data)
      ? response.data.url ?? response.data.imageUrl ?? response.data.path
      : undefined;

    if (!uploadedUrl) {
      throw new ApiError('Serverul nu a returnat URL-ul imaginii incarcate.', 500);
    }

    return uploadedUrl;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === 'object' &&
        error.response?.data &&
        'error' in error.response.data &&
        typeof error.response.data.error === 'string'
          ? error.response.data.error
          : 'Nu am putut incarca imaginea.';

      throw new ApiError(message, error.response?.status ?? 500);
    }

    throw error;
  }
}
