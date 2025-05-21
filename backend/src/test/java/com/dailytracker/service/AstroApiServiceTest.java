package com.dailytracker.service;

import com.dailytracker.service.AstroApiService.MoonData;
import com.dailytracker.service.AstroApiService.WeatherData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AstroApiServiceTest {

    @Autowired
    private AstroApiService astroApiService;

    @Test
    public void testFetchCurrentWeather() {
        WeatherData data = astroApiService.fetchCurrentWeather();
        assertNotNull(data, "WeatherData should not be null");
        assertTrue(data.getTemperature() > -100 && data.getTemperature() < 100);
        assertTrue(data.getPressure() > 800 && data.getPressure() < 1200);
        assertNotNull(data.getStatus(), "Weather status should not be null");
        System.out.println("🌡️ Temperatur: " + data.getTemperature());
        System.out.println("🔵 Luftdruck: " + data.getPressure());
        System.out.println("☁️ Status: " + data.getStatus());
    }

    @Test
    public void testFetchCurrentMoonPhase() {
        MoonData data = astroApiService.fetchCurrentMoonPhase();
        assertNotNull(data, "MoonData should not be null");
        assertNotNull(data.getPhase(), "Moon phase should not be null");
        assertNotNull(data.getEmoji(), "Moon emoji should not be null");
        System.out.println("🌕 Phase: " + data.getPhase());
        System.out.println("✨ Emoji: " + data.getEmoji());
    }
}