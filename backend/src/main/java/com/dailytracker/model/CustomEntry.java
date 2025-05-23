package com.dailytracker.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CustomEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String value;

    private String unit;

    @ManyToOne
    @JoinColumn(name = "daily_entry_id", nullable = false)
    @JsonBackReference(value = "custom-daily")
    private DailyEntry dailyEntry;

}
