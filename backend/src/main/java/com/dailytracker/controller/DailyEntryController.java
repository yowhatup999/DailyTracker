package com.dailytracker.controller;

import com.dailytracker.model.DailyEntry;
import com.dailytracker.service.DailyEntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/daily")
@RequiredArgsConstructor
public class DailyEntryController {

    private final DailyEntryService service;

    @GetMapping
    public ResponseEntity<List<DailyEntry>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyEntry> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<DailyEntry>> getByDate(@RequestParam("datum") @DateTimeFormat(pattern = "dd.MM.yyyy") LocalDate datum) {
        return ResponseEntity.ok(service.findByDatum(datum));
    }

    @GetMapping("/by-month")
    public ResponseEntity<List<DailyEntry>> getByMonthAndYear(@RequestParam("monat") int monat, @RequestParam("jahr") int jahr) {
        return ResponseEntity.ok(service.findByMonatUndJahr(monat, jahr));
    }

    @GetMapping("/by-year")
    public ResponseEntity<List<DailyEntry>> getByYear(@RequestParam("jahr") int jahr) {
        return ResponseEntity.ok(service.findByJahr(jahr));
    }

    @GetMapping("/today")
    public ResponseEntity<DailyEntry> getTodayEntry() {
        return ResponseEntity.ok(service.getOrCreateTodayForCurrentUser());
    }

    @PostMapping
    public ResponseEntity<DailyEntry> create(@RequestBody @Valid DailyEntry entry) {
        DailyEntry saved = service.createWithCustomEntries(entry);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyEntry> updateEntry(@PathVariable Long id, @RequestBody DailyEntry updatedEntry) {
        return service.updateEntry(id, updatedEntry)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
