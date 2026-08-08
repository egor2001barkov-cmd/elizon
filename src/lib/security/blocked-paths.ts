/**
 * Известные probe/сканер-пути. Отдаём 404 без раскрытия стека.
 * Админку не блокируем здесь — она защищена auth + rate limit + noindex.
 */
const BLOCKED_PATTERNS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/\.svn/i,
  /^\/\.hg/i,
  /^\/\.DS_Store/i,
  /^\/\.aws/i,
  /^\/\.docker/i,
  /^\/\.htaccess/i,
  /^\/\.htpasswd/i,
  /^\/\.ssh/i,
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/wp-content/i,
  /^\/wp-includes/i,
  /^\/xmlrpc\.php/i,
  /^\/phpmyadmin/i,
  /^\/pma\//i,
  /^\/adminer/i,
  /^\/admin\.php/i,
  /^\/administrator/i,
  /^\/manager\/html/i,
  /^\/\.well-known\/acme-challenge\/\.\./,
  /^\/server-status/i,
  /^\/server-info/i,
  /^\/actuator/i,
  /^\/debug/i,
  /^\/trace/i,
  /^\/console/i,
  /^\/telescope/i,
  /^\/_profiler/i,
  /^\/vendor\//i,
  /^\/cgi-bin\//i,
  /^\/backup/i,
  /^\/backups/i,
  /^\/sql\//i,
  /^\/dump/i,
  /^\/config\.(php|yml|yaml|json|ini|env)/i,
  /^\/web\.config/i,
  /^\/docker-compose/i,
  /^\/Dockerfile/i,
  /^\/package\.json$/i,
  /^\/composer\.(json|lock)$/i,
  /^\/yarn\.lock$/i,
  /^\/\.npmrc/i,
  /^\/node_modules\//i,
  /\.php$/i,
  /\.asp$/i,
  /\.aspx$/i,
  /\.jsp$/i,
  /\.cgi$/i,
  // path traversal
  /\.\./,
  /%2e%2e/i,
  /%252e/i,
  // common RCE probes
  /eval-stdin/i,
  /phpunit/i,
  /shell\.php/i,
  /cmd\.exe/i,
];

export function isBlockedPath(pathname: string): boolean {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // malformed encoding — treat as blocked
    return true;
  }

  // double-check null bytes and control chars
  if (/[\0-\x1f\x7f]/.test(decoded) || /[\0-\x1f\x7f]/.test(pathname)) {
    return true;
  }

  return BLOCKED_PATTERNS.some(
    (pattern) => pattern.test(pathname) || pattern.test(decoded)
  );
}
