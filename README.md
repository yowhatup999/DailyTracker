# DailyTracker

Ein persönliches Health- und Lifestyle-Tracking-Tool.

---

## Vorschau

| Login          | Registrierung    | Dashboard       | Supplement-Verwaltung |
| -------------- | --------------- | --------------- | --------------------- |
| ![Login](docs/screenshots/login.png) | ![Register](docs/screenshots/register.png) | ![Dashboard](docs/screenshots/dashboard.png) | ![Supplements](docs/screenshots/supplements.png) |

---

## Ziel

Mit DailyTracker können Nutzer ihre täglichen Gesundheitsdaten erfassen:

- Schritte
- Schlafdauer
- Wasserzufuhr
- Supplemente (mit mg-Angabe)
- Trainingseinheiten

Zusätzlich ruft die Anwendung automatisch Wetterdaten und die aktuelle Mondphase ab, um z. B. Schlafqualität besser zu verstehen.

---

## Tech-Stack

- **Backend**: Java mit Spring Boot  
- **Datenbank**: PostgreSQL  
- **API-Integration**: Wetter (OpenWeather), Mondphase  
- **Frontend**: React (mobilfähig, folgt später)

---

## Features

- Benutzer-Login
- Tagesübersicht mit Eingaben
- Automatischer Wetter- und Mondimport
- Historie mit Filterfunktion
- Supplement-Verwaltung mit mg-Angabe
- Statistikmodul (z. B. Schlaf-Schnitt, Schritt-Ziele)
- (optional) Schritt-Import von iPhone Health API

---

## Status

🛠️ In Entwicklung – aktuelle Phase: Backend-Grundgerüst + Datenmodell

---

## Installation

**Backend starten (Beispiel):**

```bash
cd backend
./mvnw spring-boot:run
