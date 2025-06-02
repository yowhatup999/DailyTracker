package com.dailytracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplementDashboardDTO {
    private Long definitionId;
    private String name;
    private Integer mengeMg;
    private Boolean genommen;
    private Long entryId;
}