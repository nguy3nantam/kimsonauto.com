export function withBasePath(path = '') {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  if (path.startsWith(import.meta.env.BASE_URL)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
