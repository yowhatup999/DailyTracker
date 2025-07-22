# DailyTracker

<img src="frontend/public/App.png" alt="App Icon" width="80" style="border-radius: 16px;" />

Ein persönliches Health- und Lifestyle-Tracking-Tool.

---

## Vorschau

| Dashboard (Demo)                     |
|--------------------------------------|
| ![Dashboard Demo](docs/screenshots/Demo_Dashboard.png) |

Weitere Screenshots:

| Login | Supplement-Verwaltung |
|-------|----------------------|
| <img src="docs/screenshots/login.png" alt="Login" width="250"/> | <img src="docs/screenshots/supplements.png" alt="Supplements" width="250"/> |

---

## 🎬 Live-Demo

Die App direkt testen, ohne Setup?

👉 **Hier geht’s zur öffentlichen DEMO-Seite:**  
[https://yowhatup999.github.io/dailytracker-demo/](https://yowhatup999.github.io/dailytracker-demo/)

- **Frontend-Only** – keine Anmeldung/Datenspeicherung  
- Einfach mal das Dashboard und UI anschauen

---


## Ziel

Mit DailyTracker kannst du deine wichtigsten Gesundheitsdaten einfach erfassen und auswerten:

- Schritte
- Schlafdauer
- Wasserzufuhr
- Supplemente (inkl. mg)
- Trainingseinheiten
- Eigene Einträge

Wetter und Mondphase werden automatisch geladen und für die Analyse genutzt (z. B. Schlafqualität).

---

## Tech-Stack

- **Backend:** Java 21 (Spring Boot)
- **Frontend:** React (Vite)
- **Datenbank:** PostgreSQL
- **APIs:** Open-Meteo (Wetter), Mondphase

---

## Features

- JWT-Login (Backend)
- Tagesübersicht mit Schnell-Eingaben
- Automatische Wetter- und Mondphasen-Daten
- Supplemente inkl. mg-Verwaltung
- Verlauf und Filter-Optionen
- Statistik (z. B. Schlaf-Schnitt, Schrittziele)
- (optional) Schritt-Import via iPhone Health API

---

## Status

🚀 **Release-Ready**  
Frontend & Backend laufen containerisiert mit Docker.  
Alle Haupt-Features laufen, Feinschliff & UX werden laufend verbessert.

---

## Installation (Lokal mit Docker Compose)

**Voraussetzung:**  
- Docker & Docker Compose installiert

**Start:**
```bash
cd infra
docker-compose up --build
