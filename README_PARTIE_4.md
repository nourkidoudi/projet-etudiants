# 🎓 Projet Micro-services - Partie 4 : Quality Assurance & Auth Service

Ce document détaille les réalisations de la **Partie 4**, axée sur la mise en place d'une stratégie de test complète, l'intégration continue et la sécurisation du système.

## 🚀 Fonctionnalités implémentées

### 1. Stratégie de Test & Qualité (QA)
Nous avons mis en place une pyramide de tests pour garantir la robustesse du micro-service `etudiant-service` :
*   **Tests Unitaires** : Couverture des services, mappers et contrôleurs (JUnit 5, Mockito).
*   **Tests d'Intégration** : Validation de la persistance avec **Testcontainers** et PostgreSQL.
*   **Tests E2E** : Scénarios complets avec **Cypress** pour le frontend.
*   **Tests de Charge** : Analyse de performance avec **Gatling**.
*   **Couverture de Code** : Configuration de **JaCoCo** avec un seuil minimal de **80%**.

### 2. Micro-service d'Authentification
Un nouveau service a été ajouté pour sécuriser l'accès :
*   **Technologie** : Node.js, Express, MongoDB.
*   **Sécurité** : Hachage des mots de passe avec **Bcrypt** et gestion des sessions via **JWT (JSON Web Tokens)**.

---

## 🛠️ Installation et Lancement

### Pré-requis
*   Docker & Docker Compose
*   Java 21 & Maven
*   Node.js

### Lancement de la Stack
```bash
docker-compose up -d --build
```

---

## 🧪 Guide des Tests

### 1. Exécution des tests Java & Rapport JaCoCo
```bash
cd api-spring-boot
mvn clean verify
```
Le rapport de couverture est généré ici : `api-spring-boot/target/site/jacoco/index.html`

### 2. Tests de Performance (Gatling)
```bash
cd api-spring-boot
mvn gatling:test
```

### 3. Tests E2E (Cypress)
```bash
cd frontend
npx cypress run
```

### 4. Test du service Auth (Postman/cURL)
*   **Register** : `POST http://localhost:3001/auth/register`
*   **Login** : `POST http://localhost:3001/auth/login`

---

## 🔄 CI/CD et Traçabilité Jira
Le projet intègre un pipeline **GitHub Actions** (`.github/workflows/test-and-report.yml`) qui :
1.  Lance automatiquement les tests à chaque push.
2.  Génère le rapport JaCoCo.
3.  Envoie les résultats vers **Xray (Jira)** pour assurer une traçabilité totale entre les User Stories et les exécutions de tests.

---
**Développé par : Nour Kidoudi**
**Branche : version-4**
