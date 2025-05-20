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
        String today = LocalDate.now().toString();
        String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&daily=moon_phase&timezone=auto&start_date=%s&end_date=%s",
                LATITUDE, LONGITUDE, today, today
        );

        try {
            Map response = restTemplate.getForObject(url, Map.class);
            Map daily = (Map) response.get("daily");

            double phase = ((java.util.List<Double>) daily.get("moon_phase")).get(0);
            return moonPhaseFromValue(phase);
        } catch (Exception e) {
            log.error("Fehler beim Abrufen von Mondphase", e);
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

    private MoonData moonPhaseFromValue(double value) {
        if (value < 0.03 || value > 0.97) return new MoonData("Neumond", "🌑");
        if (value < 0.22) return new MoonData("Zunehmende Sichel", "🌒");
        if (value < 0.28) return new MoonData("Erstes Viertel", "🌓");
        if (value < 0.47) return new MoonData("Zunehmender Mond", "🌔");
        if (value < 0.53) return new MoonData("Vollmond", "🌕");
        if (value < 0.72) return new MoonData("Abnehmender Mond", "🌖");
        if (value < 0.78) return new MoonData("Letztes Viertel", "🌗");
        return new MoonData("Abnehmende Sichel", "🌘");
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