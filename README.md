# 🎓 Projet de Gestion Académique - Architecture Micro-services (Partie 3)

Ce dépôt contient l'évolution du projet vers une architecture distribuée complète, réalisée dans le cadre de l'Activité d'Intégration de Compétences - Partie 3.

## 🏗️ Architecture Technique
Le projet est désormais décomposé en 5 briques principales orchestrées par Docker :

1.  **Service de Découverte (Eureka)** : Serveur de registre où chaque micro-service s'enregistre dynamiquement.
2.  **API Gateway (Spring Cloud Gateway)** : Point d'entrée unique (Port 8080) qui gère le routage intelligent et les politiques CORS.
3.  **Etudiant Service** : Gère les entités Étudiants et Départements (PostgreSQL + Cache Redis).
4.  **Grading Service** : Gère les notes. Utilise **Feign Client** pour vérifier l'existence d'un étudiant avant toute insertion.
5.  **Frontend Web (Next.js)** : Interface réactive utilisant Tailwind CSS pour la gestion CRUD.
6.  **Application Mobile (Flutter)** : Application mobile permettant la consultation et le filtrage par département via la Gateway.

---

## 🛠️ Réponses aux questions de l'Activité

### Q2 — Workflow GitHub Professionnel
Nous avons mis en place une structure de collaboration avancée :
- **Protection de branche** : Push direct interdit sur `main` et `version-3`. Review obligatoire.
- **Templates d'Issues** : Modèles standardisés pour les rapports de bugs (`.github/ISSUE_TEMPLATE/`).
- **Templates de Pull Request** : Checklists de validation et lien systématique vers les tickets Jira.
- **Convention de Code** : Section "Review" intégrée au README pour garantir la qualité.

### Q3 & Q4 — Micro-services & Communication
- **Grading Service** : Implémentation complète du CRUD pour les notes.
- **Feign Client** : Communication synchrone entre `grading-service` et `etudiant-service`.
- **API Gateway** : Centralisation des appels. Les clients (Web/Mobile) n'appellent qu'un seul port (8080).

### Q5 & Q6 — Interfaces Clients (Web & Mobile)
- **Frontend** : Pages `/etudiants` et `/departements` avec gestion d'état Next.js.
- **Mobile** : Mise à jour de l'app Flutter avec un `DropdownButton` pour le filtrage dynamique par département.

---

## 🚀 Guide de Lancement (Docker Compose)

### 1. Pré-requis
- Docker Desktop
- Java 21 & Maven
- Flutter (pour le mobile)

### 2. Démarrage de l'infrastructure
À la racine du projet, lancez :
```bash
docker-compose up --build -d
```

### 3. Accès aux outils
- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Eureka Dashboard** : [http://localhost:8761](http://localhost:8761)
- **API Gateway (API)** : [http://localhost:8080/api/etudiants](http://localhost:8080/api/etudiants)
- **Swagger Documentation** :
    - Etudiants : [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)
    - Notes : [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)

---

## 👥 Convention de Review
1.  **Délai** : PR relue sous 48h.
2.  **Qualité** : 1 approbation minimum + Tests CI passants.
3.  **Traçabilité** : Chaque PR doit mentionner l'ID du ticket Jira correspondant.

---
*Réalisé par [Votre Nom] - Activité Partie 3*
