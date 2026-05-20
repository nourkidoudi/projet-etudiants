# 🎓 Projet Étudiants — Plateforme Micro Services

## Description
Ce projet est une plateforme complète de gestion des étudiants basée sur une architecture micro-services moderne. Il illustre l'intégralité du cycle de vie d'une application, du développement local à la mise en production Kubernetes. Initialement conçu avec Spring Cloud, le projet a évolué vers une architecture **Kubernetes-native**, déléguant la découverte de services et le routage aux primitives natives du cluster (DNS interne, Ingress, Services).

## Architecture
L'architecture repose sur plusieurs micro-services spécialisés communiquant de manière synchrone (HTTP/REST) et asynchrone (Kafka) :
- **Etudiant Service** : Gestion du cycle de vie des étudiants.
- **Grading Service** : Gestion des notes et évaluations.
- **Notification Service** : Consommation d'événements Kafka pour l'envoi de notifications.
- **Auth Service** : Sécurisation des accès via JWT et MongoDB.
- **Frontend** : Interface utilisateur moderne en Next.js.

## Stack technique
| Composant | Technologie |
|---|---|
| Micro service étudiant | Spring Boot 3.2, JDK 21, PostgreSQL, Redis |
| Micro service notes | Spring Boot 3.2, PostgreSQL |
| Micro service notifications | Spring Boot 3.2, Apache Kafka |
| Micro service auth | Node.js, Express, MongoDB, JWT |
| Frontend | Next.js, Tailwind CSS |
| Orchestration | Kubernetes (K3S / EKS), Helm 3 |
| Observabilité | ELK Stack, Prometheus, Grafana |
| CI/CD | GitHub Actions, Jira |

## Lancement rapide

### Prérequis
- Docker Desktop ≥ 24.0
- Java 21+, Maven 3.9+
- Node.js 20+
- kubectl, Helm 3

### Avec Docker Compose (développement local)
```bash
docker compose up -d --build
```
Accès aux services :
- Frontend : [http://localhost:3000](http://localhost:3000)
- Kibana (logs) : [http://localhost:5601](http://localhost:5601)
- Grafana (métriques) : [http://localhost:3002](http://localhost:3002)

### Avec Helm sur Kubernetes
```bash
helm install projet-etudiants ./helm/projet-etudiants/
kubectl get pods --watch
```

## Tests
### Tests unitaires et d'intégration
```bash
# Pour les services Java
mvn verify
```
### Tests E2E Cypress
```bash
cd frontend && npx cypress run
```

## Structure du dépôt
```
/projet-etudiants/
├── etudiants-api/       # Micro service étudiant (Spring Boot)
├── grading-service/     # Micro service notes (Spring Boot)
├── notification-service/# Micro service notifications
├── auth-service/        # Micro service auth (Node.js)
├── frontend/            # Application Next.js
├── helm/                # Chart Helm packagisant la plateforme
├── k8s/                 # Manifests Kubernetes bruts
├── observability/       # Config ELK, Prometheus, Grafana
└── docker-compose.yml
```

## Auteur
**Nour Kidoudi** - Activité d'Intégration de Compétences (Partie 6)
