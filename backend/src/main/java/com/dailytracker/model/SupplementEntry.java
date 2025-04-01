package com.dailytracker.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "Name darf nicht leer sein")
    private String name; // "Zink"

    @NotNull(message = "Menge muss gesetzt sein")
    @Min(value = 1, message = "Menge muss größer als 0 sein")
    private Integer mengeMg; // 30mg

    private boolean genommen;

    @NotNull(message = "Datum muss gesetzt sein")
    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate datum;

    @ManyToOne
    @JoinColumn(name = "daily_entry_id", nullable = false)
    @JsonBackReference(value = "supplement-daily")
    private DailyEntry dailyEntry;

}
