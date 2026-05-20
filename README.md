# 🎓 Plateforme de Gestion des Étudiants (Architecture Micro-services) - Partie 5

Bienvenue dans la **Version 5** du projet. Cette étape marque l'aboutissement de l'architecture avec l'intégration de la communication asynchrone, de l'observabilité et de la résilience.

## 🏗️ Architecture Technique (Sprint 5)
L'architecture a été complétée par des piliers fondamentaux de la production :

1. **Communication Asynchrone (Kafka)** : Découplage total entre les services via un broker de messages (Apache Kafka).
2. **Notification Service** : Un nouveau micro-service dédié à la gestion des événements métier.
3. **Observabilité (ELK Stack)** : Centralisation des logs (Elasticsearch, Logstash, Kibana) pour un diagnostic rapide.
4. **Monitoring (Prometheus & Grafana)** : Visualisation des métriques de performance et santé du système.
5. **Résilience** : Mise en place de Health Checks avancés dans Docker Compose.

## 🚀 Fonctionnalités Clés
- **Événements Temps Réel** : Notification instantanée lors de l'inscription d'un étudiant ou de l'ajout d'une note via Kafka.
- **Logs Centralisés** : Tous les logs du système sont consultables depuis une interface unique (Kibana).
- **Tableaux de Bord** : Surveillance de la RAM, du CPU et des requêtes HTTP via Grafana.

## 🔗 Liens Utiles (Accès Local)

| Service | URL |
| :--- | :--- |
| **Frontend UI** | [http://localhost:3000](http://localhost:3000) |
| **Eureka Dashboard** | [http://localhost:8761](http://localhost:8761) |
| **Kibana (Logs)** | [http://localhost:5601](http://localhost:5601) |
| **Grafana (Métriques)** | [http://localhost:3002](http://localhost:3002) |
| **API Gateway** | [http://localhost:8080](http://localhost:8080) |

## 🛠️ Lancement rapide
```bash
docker compose up -d --build
```

**Réalisé par Nour Kidoudi - Activité Partie 5 (Communication & Observabilité)**
