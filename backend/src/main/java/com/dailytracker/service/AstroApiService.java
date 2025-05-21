// src/main/java/com/dailytracker/service/AstroApiService.java
package com.dailytracker.service;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Map;

@Slf4j
@Service
public class AstroApiService {

    private static final double LATITUDE = 50.1109;   // Frankfurt
    private static final double LONGITUDE = 8.6821;

    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherData fetchCurrentWeather() {
        return fetchWeather();
    }

    public MoonData fetchCurrentMoonPhase() {
        return fetchMoonPhase();
    }

    public WeatherData fetchWeather() {
        String today = LocalDate.now().toString();
        String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&current=temperature_2m,weather_code,surface_pressure&timezone=auto&start_date=%s&end_date=%s",
                LATITUDE, LONGITUDE, today, today
        );

        try {
            Map response = restTemplate.getForObject(url, Map.class);
            Map current = (Map) response.get("current");

            double temp = (double) current.get("temperature_2m");
            double pressure = (double) current.get("surface_pressure");
            int code = (int) current.get("weather_code");

            return new WeatherData(temp, pressure, codeToCondition(code));
        } catch (Exception e) {
            log.error("Fehler beim Abrufen von Wetterdaten", e);
            return null;
        }
    }

    public MoonData fetchMoonPhase() {
        String url = "https://shrewdly.herokuapp.com/?lang=de";

        try {
            Map response = restTemplate.getForObject(url, Map.class);
            if (response == null || !response.containsKey("data")) {
                log.error("Unerwartete API-Struktur (data fehlt): " + response);
                return null;
            }

            Map data = (Map) response.get("data");
            Map message = (Map) data.get("message");

            String name = (String) message.get("name");
            String emoji = (String) message.get("symbol");

            if (name == null || emoji == null) {
                log.error("Mondphasen-Daten fehlen: " + message);
                return null;
            }

            // Deutsch-Übersetzung optional:
            String translated = translateMoonPhaseToGerman(name);
            return new MoonData(translated, emoji);
        } catch (Exception e) {
            log.error("Fehler beim Abrufen der Mondphase von Shrewd API", e);
            return null;
        }
    }

    private String codeToCondition(int code) {
        return switch (code) {
            case 0 -> "Sonnig";
            case 1, 2 -> "Teilweise bewölkt";
            case 3 -> "Bewölkt";
            case 45, 48 -> "Nebel";
            case 51, 53, 55 -> "Sprühregen";
            case 61, 63, 65 -> "Regen";
            case 66, 67 -> "Gefrierender Regen";
            case 71, 73, 75 -> "Schnee";
            case 80, 81, 82 -> "Schauer";
            case 85, 86 -> "Schneeschauer";
            case 95, 96, 99 -> "Gewitter";
            default -> "Unbekannt";
        };
    }

    private String translateMoonPhaseToGerman(String english) {
        return switch (english.toLowerCase()) {
            case "new moon" -> "Neumond";
            case "waxing crescent" -> "Zunehmende Sichel";
            case "first quarter" -> "Erstes Viertel";
            case "waxing gibbous" -> "Zunehmender Mond";
            case "full moon" -> "Vollmond";
            case "waning gibbous" -> "Abnehmender Mond";
            case "last quarter" -> "Letztes Viertel";
            case "waning crescent" -> "Abnehmende Sichel";
            default -> english;
        };
    }

    @Getter @Setter
    public static class WeatherData {
        private double temperature;
        private double pressure;
        private String status;

        public WeatherData(double temperature, double pressure, String status) {
            this.temperature = temperature;
            this.pressure = pressure;
            this.status = status;
        }
    }

    @Getter @Setter
    public static class MoonData {
        private String phase;
        private String emoji;

        public MoonData(String phase, String emoji) {
            this.phase = phase;
            this.emoji = emoji;
        }
    }
}