# DailyTracker

Ein persönliches Health- und Lifestyle-Tracking-Tool.

---

## Vorschau

| Login | Registrierung | Dashboard | Supplement-Verwaltung |
|-------|---------------|-----------|-----------------------|
| ![Login](docs/screenshots/login.png) | ![Registrierung](docs/screenshots/register.png) | ![Dashboard](docs/screenshots/dashboard.png) | ![Supplements](docs/screenshots/supplements.png) |

---

## Ziel

Mit DailyTracker können Nutzer ihre täglichen Gesundheitsdaten einfach erfassen:

- Schritte
- Schlafdauer
- Wasserzufuhr
- Supplemente (mit mg-Angabe)
- Trainingseinheiten

Zusätzlich werden Wetterdaten und die aktuelle Mondphase automatisch geladen (z. B. für bessere Auswertung der Schlafqualität).

---

## Tech-Stack

- **Backend:** Java mit Spring Boot  
- **Datenbank:** PostgreSQL  
- **API-Integration:** Wetter (OpenWeather), Mondphase  
- **Frontend:** React (mobilfähig, folgt später)

---

## Features

- Benutzer-Login
- Tagesübersicht mit schnellen Eingaben
- Automatischer Wetter- und Mondimport
- Supplement-Verwaltung mit mg-Angabe
- Historie mit Filterfunktion
- Statistikmodul (z. B. Schlaf-Schnitt, Schritt-Ziele)
- (optional) Schritt-Import von iPhone Health API

---

## Status

🚀 **Fast bereit für das erste Release.**  
Frontend und Backend laufen, Basis-Features sind nutzbar. Einzelne Feinschliffe fehlen noch.

---

## Installation

**Backend starten:**
```bash
cd backend
./mvnw spring-boot:run
