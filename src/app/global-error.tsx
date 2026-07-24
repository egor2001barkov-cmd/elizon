"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru" style={{ backgroundColor: "#071e33" }}>
      <body
        style={{
          backgroundColor: "#071e33",
          color: "#ffffff",
          margin: 0,
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
            ELIZON — временный сбой
          </h1>
          <p style={{ marginTop: 12, color: "#8BA4BC", fontSize: 14 }}>
            Нажмите «Обновить». Если экран снова пустой — очистите кэш браузера.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              minHeight: 44,
              padding: "0 24px",
              borderRadius: 12,
              border: "none",
              background: "#4DB8E8",
              color: "#071e33",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Обновить
          </button>
        </div>
      </body>
    </html>
  );
}
