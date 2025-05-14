package com.dailytracker.controller;

import com.dailytracker.model.CustomEntry;
import com.dailytracker.model.DailyEntry;
import com.dailytracker.repository.CustomEntryRepository;
import com.dailytracker.repository.DailyEntryRepository;
import com.dailytracker.service.CustomEntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/custom")
@RequiredArgsConstructor
public class CustomEntryController {

    private final CustomEntryService service;
    private final DailyEntryRepository dailyRepo;
    private final CustomEntryRepository repo;

    @GetMapping
    public List<CustomEntry> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomEntry> getById(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/daily/{dailyId}")
    public List<CustomEntry> getByDailyId(@PathVariable Long dailyId) {
        return service.findByDailyEntryId(dailyId);
    }

    @PostMapping("/{dailyId}")
    public ResponseEntity<CustomEntry> create(@PathVariable Long dailyId, @RequestBody @Valid CustomEntry entry) {
        DailyEntry daily = dailyRepo.findById(dailyId).orElseThrow();
        entry.setDailyEntry(daily);
        return ResponseEntity.ok(repo.save(entry));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomEntry> update(@PathVariable Long id, @RequestBody @Valid CustomEntry entry) {
        return service.update(id, entry)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CustomEntry> patchValue(@PathVariable Long id, @RequestBody CustomEntry data) {
        return service.patchValue(id, data.getValue())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
