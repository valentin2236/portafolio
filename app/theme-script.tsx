import Script from "next/script";

export function ThemeScript() {
  const code = `
  (function() {
    try {
      const ls = localStorage.getItem("theme");
      const mq = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = ls === "dark" || (ls === null && mq);
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    } catch (e) {}
  })();
  `;
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {code}
    </Script>
  );
}
