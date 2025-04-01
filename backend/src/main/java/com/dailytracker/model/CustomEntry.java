package com.dailytracker.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CustomEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String value;

    @ManyToOne
    @JoinColumn(name = "daily_entry_id", nullable = false)
    @JsonBackReference
    private DailyEntry dailyEntry;
}
