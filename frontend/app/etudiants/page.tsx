"use client";

import { useState, useEffect } from 'react';
const API_GATEWAY = "http://localhost:8081";
interface Etudiant {
    id: number;
    cin: string;
    nom: string;
    dateNaissance: string;
    email: string;
    anneePremiereInscription: number;
    departementId: number;
    departementNom: string;
}

interface Departement {
    id: number;
    nom: string;
}

export default function EtudiantsPage() {
    const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
    const [depts, setDepts] = useState<Departement[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        cin: '',
        nom: '',
        dateNaissance: '',
        email: '',
        anneePremiereInscription: '',
        departementId: ''
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [stdRes, deptRes] = await Promise.all([
                fetch(`${API_GATEWAY}/api/etudiants`),
                fetch(`${API_GATEWAY}/api/departements`)
            ]);
            
            if (stdRes.ok) setEtudiants(await stdRes.json());
            if (deptRes.ok) setDepts(await deptRes.json());
        } catch (e) {
            console.error("Erreur de chargement:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_GATEWAY}/api/etudiants/${editingId}` : `${API_GATEWAY}/api/etudiants`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cin: form.cin,
                    nom: form.nom,
                    email: form.email,
                    dateNaissance: form.dateNaissance,
                    anneePremiereInscription: parseInt(form.anneePremiereInscription),
                    departementId: parseInt(form.departementId)
                })
            });

            if (res.ok) {
                alert("Étudiant enregistré avec succès !");
                setForm({ cin: '', nom: '', dateNaissance: '', email: '', anneePremiereInscription: '', departementId: '' });
                setEditingId(null);
                fetchInitialData();
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (e) {
            alert("Erreur de connexion à l'API");
        }
    };

    const deleteEtudiant = async (id: number) => {
        if (confirm("Supprimer cet étudiant ?")) {
            try {
                const res = await fetch(`${API_GATEWAY}/api/etudiants/${id}`, { method: 'DELETE' });
                if (res.ok) fetchInitialData();
            } catch (e) {
                alert("Erreur lors de la suppression");
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Chargement...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto text-slate-900">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600">Gestion des Étudiants</h1>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-slate-100">
                <h2 className="text-xl font-semibold mb-4 text-slate-800">{editingId ? "Modifier" : "Ajouter"} un étudiant</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input className="p-3 border rounded-xl" placeholder="CIN" value={form.cin} onChange={e => setForm({...form, cin: e.target.value})} required />
                    <input className="p-3 border rounded-xl" placeholder="Nom Complet" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                    <input className="p-3 border rounded-xl" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                    <input className="p-3 border rounded-xl" type="date" value={form.dateNaissance} onChange={e => setForm({...form, dateNaissance: e.target.value})} required />
                    <input className="p-3 border rounded-xl" type="number" placeholder="Année" value={form.anneePremiereInscription} onChange={e => setForm({...form, anneePremiereInscription: e.target.value})} required />
                    <select className="p-3 border rounded-xl" value={form.departementId} onChange={e => setForm({...form, departementId: e.target.value})} required>
                        <option value="">Département</option>
                        {depts.map(d => <option key={d.id} value={d.id}>{d.nom}</option>)}
                    </select>
                    <div className="md:col-span-3 flex gap-2">
                        <button type="submit" className="flex-1 bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transition">Enregistrer</button>
                        {editingId && (
                            <button type="button" onClick={() => {setEditingId(null); setForm({cin:'', nom:'', email:'', dateNaissance:'', anneePremiereInscription:'', departementId:''})}} className="bg-slate-200 text-slate-700 p-3 rounded-xl font-bold">
                                Annuler
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {etudiants.map((s: Etudiant) => (
                    <div key={s.id} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition">
                        <h3 className="font-bold text-lg text-slate-800">{s.nom}</h3>
                        <p className="text-sm text-indigo-500 font-medium mb-2">{s.departementNom || "Sans Département"}</p>
                        <div className="text-sm text-slate-500 space-y-1 mb-4">
                            <p>CIN: {s.cin}</p>
                            <p>Email: {s.email}</p>
                        </div>
                        <div className="flex gap-4 border-t pt-4">
                            <button onClick={() => { 
                                setForm({
                                    cin: s.cin || '', 
                                    nom: s.nom || '', 
                                    email: s.email || '', 
                                    dateNaissance: s.dateNaissance || '', 
                                    anneePremiereInscription: s.anneePremiereInscription?.toString() || '', 
                                    departementId: s.departementId?.toString() || ''
                                }); 
                                setEditingId(s.id); 
                            }} className="text-indigo-600 text-sm font-bold hover:underline">Modifier</button>
                            <button onClick={() => deleteEtudiant(s.id)} className="text-rose-600 text-sm font-bold hover:underline">Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
