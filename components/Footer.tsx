export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-400 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Valentín Arriola — Portafolio</p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/valentin2236" target="_blank" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/valentin-arriola-53950a21a/" target="_blank" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:valentinarriol04@gmail.com" className="hover:text-white transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
