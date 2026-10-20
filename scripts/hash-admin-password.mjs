#!/usr/bin/env node
/**
 * Генерация scrypt-хеша пароля админки ELIZON.
 *
 * Ротация пароля:
 *   1. SALT=$(openssl rand -hex 16)
 *   2. node scripts/hash-admin-password.mjs "$SALT" 'НовыйПароль'
 *   3. Вписать на сервере в /opt/elizon/.env:
 *        ADMIN_PASSWORD_SALT=$SALT
 *        ADMIN_PASSWORD_HASH=<вывод скрипта>
 *      и пересобрать контейнер.
 *
 * Соль и хеш живут только в .env — в публичном репозитории их нет.
 */
import { scryptSync, randomBytes } from "node:crypto";

const [saltArg, pwdArg] = process.argv.slice(2);

if (!pwdArg) {
  console.error("Использование: node scripts/hash-admin-password.mjs <salt|auto> <пароль>");
  process.exit(1);
}

const salt = !saltArg || saltArg === "auto" ? randomBytes(16).toString("hex") : saltArg;
const hash = scryptSync(pwdArg, salt, 64).toString("base64");

console.log(`ADMIN_PASSWORD_SALT=${salt}`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
