package com.dailytracker.controller;

import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.SupplementEntry;
import com.dailytracker.service.SupplementEntryService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/supplements")
@RequiredArgsConstructor
public class SupplementEntryController {

    private final SupplementEntryService service;
    private final com.dailytracker.repository.DailyEntryRepository dailyEntryRepository;
    private final com.dailytracker.repository.SupplementEntryRepository supplementEntryRepository;
    private final Validator validator;

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

        Set<ConstraintViolation<SupplementEntry>> violations = validator.validate(supplement);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        return supplementEntryRepository.save(supplement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplementEntry> updateSupplement(@PathVariable Long id, @RequestBody SupplementEntry entry) {
        return service.updateSupplement(id, entry)
                .map(updated -> ResponseEntity.ok(updated))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SupplementEntry> patchGenommen(@PathVariable Long id, @RequestBody SupplementEntry data) {
        return service.patchGenommen(id, data.isGenommen())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
