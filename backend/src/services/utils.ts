
function toUrlParams(params: Record<string, any>): string {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export function appendParams(url: string, params: Record<string, any>): string {
  return url + (url.includes('?') ? '&' : '?') + toUrlParams(params);
}
