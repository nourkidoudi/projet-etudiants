import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-24 text-slate-900">
      <h1 className="text-4xl font-bold mb-8">Système de Gestion Scolaire (V3)</h1>
      <div className="flex gap-8">
        <Link href="/etudiants" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">🎓 Étudiants</Link>
        <Link href="/departements" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">🏢 Départements</Link>
      </div>
    </main>
  );
}
