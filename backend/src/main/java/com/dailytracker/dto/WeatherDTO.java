package com.dailytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherDTO {
    private String status;
    private Double temperature;
    private Double luftdruck;
    private String emoji;
}