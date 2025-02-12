export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0f0a1f]" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-800/5 to-transparent" />
    </div>
  );
}
