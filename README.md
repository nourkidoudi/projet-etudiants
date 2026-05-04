# 🎓 Projet Micro-services - Partie 4 : Quality Assurance & Auth Service

Bienvenue dans la **Version 4** du projet. Cette étape marque l'aboutissement du cycle de développement avec une attention particulière portée à la qualité logicielle (QA), aux tests automatisés et à la sécurité.

## 🏗️ Architecture Technique (Mise à jour)
La stack technique s'est enrichie de nouveaux composants :
*   **Auth Service** : Micro-service Node.js/Express pour la gestion JWT.
*   **MongoDB** : Base de données NoSQL pour le stockage des utilisateurs.
*   **QA Suite** : Intégration de JaCoCo, Gatling et Cypress.
*   **CI/CD** : GitHub Actions lié à Jira/Xray.

## 🧪 Statut des Tests (QA)
*   **Couverture JaCoCo** : **80%+** validée.
*   **Tests Unitaires/Intégration** : JUnit 5 + Testcontainers.
*   **Tests E2E** : Cypress.
*   **Tests de Stress** : Gatling.

---

## 📖 Documentation détaillée
Pour consulter le guide complet de cette version (commandes, architecture, stratégie de test), veuillez ouvrir le fichier dédié :
👉 **[README_PARTIE_4.md](./README_PARTIE_4.md)**

---

## 🚀 Lancement rapide
```bash
docker-compose up -d --build
```
Accès Frontend : http://localhost:3000
Accès Auth API : http://localhost:3001/auth

---
*Réalisé par Nour Kidoudi - Activité Partie 4*
