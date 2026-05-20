import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gestion Etudiants',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const EtudiantListPage(),
    );
  }
}

// ── Modèles ──────────────────────────────────────────
class Departement {
  final int id;
  final String nom;
  Departement({required this.id, required this.nom});
  factory Departement.fromJson(Map<String, dynamic> json) {
    return Departement(id: json['id'], nom: json['nom']);
  }
}

class Etudiant {
  final int id;
  final String cin;
  final String nom;
  final String departementNom;

  Etudiant({required this.id, required this.cin, required this.nom, required this.departementNom});

  factory Etudiant.fromJson(Map<String, dynamic> json) {
    return Etudiant(
      id: json['id'],
      cin: json['cin'],
      nom: json['nom'],
      departementNom: json['departementNom'] ?? 'N/A',
    );
  }
}

// ── Page principale ──────────────────────────────────
class EtudiantListPage extends StatefulWidget {
  const EtudiantListPage({super.key});

  @override
  State<EtudiantListPage> createState() => _EtudiantListPageState();
}

class _EtudiantListPageState extends State<EtudiantListPage> {
  // Pour le test dans Chrome, utilisez 'localhost'. Pour l'émulateur, utilisez '10.0.2.2'.
  static const String baseUrl = 'http://localhost:8080/api'; 
  
  List<Etudiant> etudiants = [];
  List<Departement> departements = [];
  int? selectedDepartementId;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchInitialData();
  }

  Future<void> fetchInitialData() async {
    try {
      final deptRes = await http.get(Uri.parse('$baseUrl/departements'));
      final stdRes = await http.get(Uri.parse('$baseUrl/etudiants'));

      if (deptRes.statusCode == 200 && stdRes.statusCode == 200) {
        final List deptsData = jsonDecode(deptRes.body);
        final List stdsData = jsonDecode(stdRes.body);
        
        setState(() {
          departements = deptsData.map((d) => Departement.fromJson(d)).toList();
          etudiants = stdsData.map((s) => Etudiant.fromJson(s)).toList();
          isLoading = false;
        });
      }
    } catch (e) {
      debugPrint('Erreur: $e');
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    // Filtrage local pour la démo
    final displayedEtudiants = selectedDepartementId == null 
      ? etudiants 
      : etudiants.where((s) {
          final dept = departements.firstWhere((d) => d.id == selectedDepartementId);
          return s.departementNom == dept.nom;
        }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Gestion Académique', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.indigo,
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // --- Sélecteur de département (Q5) ---
                Container(
                  padding: const EdgeInsets.all(16),
                  color: Colors.indigo.withOpacity(0.1),
                  child: DropdownButtonFormField<int>(
                    decoration: const InputDecoration(
                      labelText: 'Filtrer par Département',
                      border: OutlineInputBorder(),
                      filled: true,
                      fillColor: Colors.white,
                    ),
                    value: selectedDepartementId,
                    items: [
                      const DropdownMenuItem(value: null, child: Text('Tous les départements')),
                      ...departements.map((d) => DropdownMenuItem(value: d.id, child: Text(d.nom))),
                    ],
                    onChanged: (val) => setState(() => selectedDepartementId = val),
                  ),
                ),
                // --- Liste des étudiants ---
                Expanded(
                  child: ListView.builder(
                    itemCount: displayedEtudiants.length,
                    itemBuilder: (context, index) {
                      final e = displayedEtudiants[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        elevation: 2,
                        child: ListTile(
                          leading: const CircleAvatar(backgroundColor: Colors.indigo, child: Icon(Icons.person, color: Colors.white)),
                          title: Text(e.nom, style: const TextStyle(fontWeight: FontWeight.bold)),
                          subtitle: Text('CIN: ${e.cin}\nDépartement: ${e.departementNom}'),
                          trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }
}