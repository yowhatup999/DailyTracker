package com.dailytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardInfoResponse {
    private String username;
    private WeatherDTO weather;
    private MoonDTO moon;
    private List<SupplementDashboardDTO> supplements;
    private List<CustomEntryDashboardDTO> customs;
}