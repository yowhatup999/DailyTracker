package com.dailytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardInfoResponse {
    private Long id;
    private String username;
    private Integer schritte;
    private Integer wasserMl;
    private WeatherDTO weather;
    private MoonDTO moon;
    private List<SupplementDashboardDTO> supplements;
    private List<CustomEntryDashboardDTO> customs;
}