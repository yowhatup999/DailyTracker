package com.dailytracker.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    private String mondphase;

    @OneToMany(mappedBy = "dailyEntry", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SupplementEntry> supplements = new ArrayList<>();


}
