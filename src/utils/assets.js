export function withBasePath(path = '') {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  if (path.startsWith(import.meta.env.BASE_URL)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export function sanitizeAssetUrl(path, fallback = '') {
  if (!path || typeof path !== 'string') return fallback;

  const value = path.trim();
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^data:image\//i.test(value)) return value;
  if (value.startsWith(import.meta.env.BASE_URL)) return value;
  if (value.startsWith('/')) return withBasePath(value);
  if (/^[a-zA-Z0-9._/-]+$/.test(value)) return withBasePath(value);

  return fallback;
}
