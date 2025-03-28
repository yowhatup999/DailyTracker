package com.dailytracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate datum;
    private Integer schritte;
    private Integer schlafStunden;
    private Integer wasserMl;
    private Double wetterTemp;
    private Double wetterLuftdruck;
    private String mondphase;
}
