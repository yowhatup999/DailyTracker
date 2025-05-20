package com.dailytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardInfoResponse {
    private String username;
    private WeatherDTO weather;
    private MoonDTO moon;
}