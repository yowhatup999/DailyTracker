package com.dailytracker.controller;

import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.SupplementEntry;
import com.dailytracker.service.SupplementEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplements")
@RequiredArgsConstructor
public class SupplementEntryController {

    private final SupplementEntryService service;
    private final com.dailytracker.repository.DailyEntryRepository dailyEntryRepository;
    private final com.dailytracker.repository.SupplementEntryRepository supplementEntryRepository;


    @GetMapping
    public List<SupplementEntry> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplementEntry> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/daily/{dailyEntryId}")
    public List<SupplementEntry> getByDailyEntry(@PathVariable Long dailyEntryId) {
        return service.findByDailyEntryId(dailyEntryId);
    }

    @PostMapping("/{dailyEntryId}")
    public SupplementEntry createForDay(@PathVariable Long dailyEntryId, @RequestBody SupplementEntry supplement) {
        DailyEntry daily = dailyEntryRepository.findById(dailyEntryId)
                .orElseThrow(() -> new RuntimeException("DailyEntry not found"));

        supplement.setDailyEntry(daily);
        return supplementEntryRepository.save(supplement);
    }


    @PutMapping("/{id}")
    public ResponseEntity<SupplementEntry> update(@PathVariable Long id, @RequestBody SupplementEntry updated) {
        return service.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setMengeMg(updated.getMengeMg());
                    existing.setGenommen(updated.isGenommen());
                    existing.setDatum(updated.getDatum());
                    existing.setDailyEntry(updated.getDailyEntry());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
