const BLOCKED_PATTERNS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/wp-content/i,
  /^\/xmlrpc\.php/i,
  /^\/phpmyadmin/i,
  /^\/admin\.php/i,
  /^\/\.well-known\/acme-challenge\/\.\./,
  /\.php$/i,
  /\.asp$/i,
  /\.aspx$/i,
  /\/cgi-bin\//i,
  /^\/vendor\//i,
  /^\/\.htaccess/i,
];

export function isBlockedPath(pathname: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(pathname));
}