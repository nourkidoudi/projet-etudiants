"use client";

import { useState, useEffect } from 'react';

const API_GATEWAY = "http://localhost:8080";

interface Departement {
    id: number;
    nom: string;
}

export default function DepartementsPage() {
    const [depts, setDepts] = useState<Departement[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ nom: '' });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchDepts();
    }, []);

    const fetchDepts = async () => {
        try {
            const res = await fetch(`${API_GATEWAY}/api/departements`);
            if (res.ok) {
                const data = await res.json();
                setDepts(data);
            }
        } catch (e) {
            console.error("Erreur de chargement:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_GATEWAY}/api/departements/${editingId}` : `${API_GATEWAY}/api/departements`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                alert("Département enregistré avec succès !");
                setForm({ nom: '' });
                setEditingId(null);
                fetchDepts();
            } else {
                const errorText = await res.text();
                alert("Erreur lors de l'enregistrement: " + res.status + " " + errorText);
            }
        } catch (e) {
            alert("Erreur de connexion à la Gateway: " + e);
        }
    };

    const deleteDept = async (id: number) => {
        if (confirm("Supprimer ce département ?")) {
            try {
                await fetch(`${API_GATEWAY}/api/departements/${id}`, { method: 'DELETE' });
                fetchDepts();
            } catch (e) {
                alert("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto text-slate-900">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600">Gestion des Départements</h1>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-slate-100">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">{editingId ? "Modifier" : "Ajouter"} un département</h2>
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900" placeholder="Nom du département" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">Valider</button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b">
                        <tr><th className="p-4 text-slate-600">Nom</th><th className="p-4 text-slate-600 text-right">Actions</th></tr>
                    </thead>
                    <tbody>
                        {depts.length === 0 ? (
                            <tr><td colSpan={2} className="p-8 text-center text-slate-400">Aucun département trouvé.</td></tr>
                        ) : (
                            depts.map(d => (
                                <tr key={d.id} className="border-t hover:bg-slate-50 transition">
                                    <td className="p-4 font-medium text-slate-800">{d.nom}</td>
                                    <td className="p-4 text-right flex gap-2 justify-end">
                                        <button onClick={() => { setForm({nom: d.nom}); setEditingId(d.id); }} className="text-amber-600 hover:bg-amber-50 px-3 py-1 rounded-lg">Modifier</button>
                                        <button onClick={() => deleteDept(d.id)} className="text-rose-600 hover:bg-rose-50 px-3 py-1 rounded-lg">Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
