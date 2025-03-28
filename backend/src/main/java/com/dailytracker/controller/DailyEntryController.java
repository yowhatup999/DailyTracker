package com.dailytracker.controller;

import com.dailytracker.model.DailyEntry;
import com.dailytracker.service.DailyEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/daily")
@RequiredArgsConstructor
public class DailyEntryController {

    private final DailyEntryService service;

    @GetMapping
    public List<DailyEntry> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyEntry> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DailyEntry create(@RequestBody DailyEntry entry) {
        return service.save(entry);
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


