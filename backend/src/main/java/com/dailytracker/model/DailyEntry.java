package com.dailytracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate datum;

    private Integer schritte;
    private Integer schlafStunden;
    private Integer wasserMl;

    private Double wetterTemp;
    private Double wetterLuftdruck;
    private String wetterStatus;

    private String mondphase;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}