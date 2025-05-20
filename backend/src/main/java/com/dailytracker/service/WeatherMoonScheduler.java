package com.dailytracker.service;

import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.User;
import com.dailytracker.repository.DailyEntryRepository;
import com.dailytracker.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class WeatherMoonScheduler {

    private final UserRepository userRepository;
    private final DailyEntryService dailyEntryService;
    private final AstroApiService astroApiService;
    private final DailyEntryRepository dailyEntryRepository;

    // Wetter alle 4h + 00:00 & 12:00 Uhr
    @Scheduled(cron = "0 0 0,4,8,12,16,20 * * *")
    @Transactional
    public void updateWeather() {
        log.info("[Scheduler] Starte Wetteraktualisierung...");
        List<User> users = userRepository.findAll();
        users.forEach(user -> {
            DailyEntry entry = dailyEntryService.getOrCreateTodayForUser(user);
            if (entry.getWetterTemp() == null || entry.getWetterLuftdruck() == null || entry.getWetterStatus() == null
                    || isScheduledHour()) {
                var weather = astroApiService.fetchCurrentWeather();
                if (weather != null) {
                    entry.setWetterTemp(weather.getTemperature());
                    entry.setWetterLuftdruck(weather.getPressure());
                    entry.setWetterStatus(weather.getStatus());
                    dailyEntryRepository.save(entry);
                    log.info("[Scheduler] Wetterdaten aktualisiert für Benutzer {}", user.getEmail());
                }
            }
        });
    }

    // Mondphase täglich um 00:15 Uhr
    @Scheduled(cron = "0 15 0 * * *")
    @Transactional
    public void updateMoonPhase() {
        log.info("[Scheduler] Starte Mondphasen-Aktualisierung...");
        List<User> users = userRepository.findAll();
        users.forEach(user -> {
            DailyEntry entry = dailyEntryService.getOrCreateTodayForUser(user);
            if (entry.getMondphase() == null) {
                var moon = astroApiService.fetchCurrentMoonPhase();
                if (moon != null) {
                    entry.setMondphase(moon.getPhase());
                    dailyEntryRepository.save(entry);
                    log.info("[Scheduler] Mondphase aktualisiert für Benutzer {}", user.getEmail());
                }
            }
        });
    }

    private boolean isScheduledHour() {
        int hour = java.time.LocalTime.now().getHour();
        return hour == 0 || hour == 12;
    }
}
