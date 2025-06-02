// src/main/java/com/dailytracker/controller/DashboardController.java
package com.dailytracker.controller;

import com.dailytracker.dto.*;
import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.User;
import com.dailytracker.service.DailyEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DailyEntryService dailyEntryService;

    @GetMapping("/info")
    public DashboardInfoResponse getDashboardInfo(@AuthenticationPrincipal User user) {
        DailyEntry entry = dailyEntryService.getOrCreateTodayForUser(user);
        dailyEntryService.updateMissingAstroData(entry);

        WeatherDTO weather = new WeatherDTO(
                entry.getWetterStatus(),
                entry.getWetterTemp(),
                entry.getWetterLuftdruck(),
                getWeatherEmoji(entry.getWetterStatus())
        );
        MoonDTO moon = new MoonDTO(
                entry.getMondphase(),
                getMoonEmoji(entry.getMondphase())
        );

        List<SupplementDashboardDTO> supplements = dailyEntryService.getDashboardSupplementsForUserAndDay(user, entry);
        List<CustomEntryDashboardDTO> customs = dailyEntryService.getDashboardCustomsForUserAndDay(user, entry);

        return new DashboardInfoResponse(
                user.getDisplayName(),
                weather,
                moon,
                supplements,
                customs
        );
    }

    private String getWeatherEmoji(String status) {
        if (status == null) return "❗";
        return switch (status.toLowerCase()) {
            case "sonnig" -> "☀️";
            case "bewölkt" -> "☁️";
            case "teilweise bewölkt" -> "⛅";
            case "regen" -> "🌧️";
            case "schnee" -> "🌨️";
            case "gewitter" -> "⛈️";
            case "nebel" -> "🌫️";
            default -> "🌈";
        };
    }

    private String getMoonEmoji(String phase) {
        if (phase == null) return "❓";
        return switch (phase.toLowerCase()) {
            case "neumond" -> "🌑";
            case "zunehmende sichel" -> "🌒";
            case "erstes viertel" -> "🌓";
            case "zunehmender mond" -> "🌔";
            case "vollmond" -> "🌕";
            case "abnehmender mond" -> "🌖";
            case "letztes viertel" -> "🌗";
            case "abnehmende sichel" -> "🌘";
            default -> "❓";
        };
    }
}