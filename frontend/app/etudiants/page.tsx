"use client";

import { useState, useEffect } from 'react';

const API_GATEWAY = "http://localhost:8080";

interface Etudiant {
    id: number; cin: string; nom: string; dateNaissance: string; email: string;
    anneePremiereInscription: number; departementId: number; departementNom: string;
}

interface Departement { id: number; nom: string; }

export default function EtudiantsPage() {
    const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
    const [depts, setDepts] = useState<Departement[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ cin: '', nom: '', dateNaissance: '', email: '', anneePremiereInscription: '', departementId: '' });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => { fetchInitialData(); }, []);

    const fetchInitialData = async () => {
        try {
            const [stdRes, deptRes] = await Promise.all([
                fetch(`${API_GATEWAY}/api/etudiants`),
                fetch(`${API_GATEWAY}/api/departements`)
            ]);
            setEtudiants(await stdRes.json());
            setDepts(await deptRes.json());
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_GATEWAY}/api/etudiants/${editingId}` : `${API_GATEWAY}/api/etudiants`;
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...form, anneePremiereInscription: parseInt(form.anneePremiereInscription), departementId: parseInt(form.departementId)})
        });
        setForm({ cin: '', nom: '', dateNaissance: '', email: '', anneePremiereInscription: '', departementId: '' });
        setEditingId(null);
        fetchInitialData();
    };

    return (
        <div className="p-8 max-w-6xl mx-auto text-slate-900">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600">Gestion des Étudiants</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-slate-100">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input className="p-3 border rounded-xl text-slate-900" placeholder="CIN" value={form.cin} onChange={e => setForm({...form, cin: e.target.value})} required />
                    <input className="p-3 border rounded-xl text-slate-900" placeholder="Nom" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                    <input className="p-3 border rounded-xl text-slate-900" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                    <input className="p-3 border rounded-xl text-slate-900" type="date" value={form.dateNaissance} onChange={e => setForm({...form, dateNaissance: e.target.value})} required />
                    <input className="p-3 border rounded-xl text-slate-900" type="number" placeholder="Année" value={form.anneePremiereInscription} onChange={e => setForm({...form, anneePremiereInscription: e.target.value})} required />
                    <select className="p-3 border rounded-xl text-slate-900" value={form.departementId} onChange={e => setForm({...form, departementId: e.target.value})} required>
                        <option value="">Département</option>
                        {depts.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
                    </select>
                    <button className="md:col-span-3 bg-indigo-600 text-white p-3 rounded-xl font-bold">Enregistrer</button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {etudiants.map(s => (
                    <div key={s.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                        <h3 className="font-bold text-slate-800">{s.nom}</h3>
                        <p className="text-sm text-slate-500 mb-4">{s.departementNom}</p>
                        <button onClick={() => { setForm({cin:s.cin, nom:s.nom, email:s.email, dateNaissance:s.dateNaissance, anneePremiereInscription:s.anneePremiereInscription.toString(), departementId:s.departementId.toString()}); setEditingId(s.id); }} className="text-indigo-600 text-sm font-bold">Modifier</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
