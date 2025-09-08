import type { IncomingMessage } from 'node:http';
import { verifyJwt } from './auth';
import { createLoaders } from './loaders';
import { YogaInitialContext } from 'graphql-yoga';

export type Viewer = { id: number } | null;

export type Context = {
  viewerId: number | null;
  loaders: ReturnType<typeof createLoaders>;
  params: Promise<Record<string, string>>;
} & YogaInitialContext;

export async function getViewerIdFromAuthCookie(
  req: YogaInitialContext['request'],
) {
  const header = req?.headers?.get('Authorization');

  if (header?.startsWith('Bearer ')) {
    const token = header.replace('Bearer ', '');
    const payload = verifyJwt<{ sub: string }>(token);
    const id = payload?.sub ? Number(payload.sub) : null;
    return Number.isFinite(id) ? id : null;
  }

  const cookie = await req?.cookieStore?.get('auth-token');
  if (!cookie || Array.isArray(cookie)) return null;

  if (!cookie?.value) return null;

  const payload = verifyJwt<{ sub: string }>(cookie.value);
  const id = payload?.sub ? Number(payload.sub) : null;
  return Number.isFinite(id) ? id : null;
}

export async function createContext(ctx: YogaInitialContext) {
  const viewerId = await getViewerIdFromAuthCookie(ctx.request);

  const loaders = createLoaders(viewerId);
  return { viewerId, loaders, ...ctx };
}
