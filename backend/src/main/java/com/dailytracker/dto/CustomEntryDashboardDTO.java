package com.dailytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomEntryDashboardDTO {
    private Long templateId;
    private String name;
    private String unit;
    private String value;
    private Long entryId;
}