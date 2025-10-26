export default function LoadingProyectos() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-56 bg-white/5 rounded-lg animate-pulse" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card h-40 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
