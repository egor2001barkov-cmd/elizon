"use client";

import { useEffect } from "react";

/**
 * Полноценная навигация для внутренних ссылок: каждый клик — реальная
 * загрузка документа, поэтому браузер показывает штатный индикатор
 * загрузки в адресной строке (как на классических сайтах).
 *
 * Исключения:
 *  - /admin — панель работает как SPA без перезагрузок;
 *  - якоря на текущей странице (#form) — обычный скролл;
 *  - ссылки с модификаторами (Ctrl/Cmd/Shift), _blank, download, tel/mailto.
 */
export function NavigationMode() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // Только внутренние пути одного приложения
      if (!href.startsWith("/") || href.startsWith("//")) return;

      // Служебные и клиентские маршруты вне контента
      if (href.startsWith("/admin")) return;
      if (href.startsWith("/api/")) return;

      // Якорь на текущей странице — оставляем браузеру (скролл)
      if (href.startsWith("#")) return;
      const hashIdx = href.indexOf("#");
      if (hashIdx !== -1) {
        const path = href.slice(0, hashIdx);
        if (path === "" || path === window.location.pathname) return;
      }

      if (a.target === "_blank" || a.hasAttribute("download")) return;

      e.preventDefault();
      window.location.assign(href);
    };

    // Capture-фаза: срабатываем раньше обработчиков роутера на самом <a>
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
