package com.dailytracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplementEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // "Zink"
    private Integer mengeMg; // 30mg
    private boolean genommen;

    private LocalDate datum;

    @ManyToOne
    @JoinColumn(name = "daily_entry_id")
    private DailyEntry dailyEntry;

}
