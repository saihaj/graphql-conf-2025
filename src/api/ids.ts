export function toGlobalId(typename: string, dbId: number | string): string {
  return Buffer.from(`${typename}:${dbId}`).toString('base64');
}

export function fromGlobalId(globalId: string): {
  typename: string;
  dbId: string;
} {
  const decoded = Buffer.from(globalId, 'base64').toString('utf8');
  const idx = decoded.indexOf(':');
  if (idx === -1) throw new Error('Invalid global ID');
  return { typename: decoded.slice(0, idx), dbId: decoded.slice(idx + 1) };
}
