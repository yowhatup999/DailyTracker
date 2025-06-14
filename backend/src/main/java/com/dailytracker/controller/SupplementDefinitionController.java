package com.dailytracker.controller;

import com.dailytracker.model.SupplementDefinition;
import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.SupplementEntry;
import com.dailytracker.model.User;
import com.dailytracker.repository.SupplementDefinitionRepository;
import com.dailytracker.repository.SupplementEntryRepository;
import com.dailytracker.repository.DailyEntryRepository;
import com.dailytracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/supplement-definition")
@RequiredArgsConstructor
public class SupplementDefinitionController {

    private final SupplementDefinitionRepository repository;
    private final SupplementEntryRepository supplementEntryRepository;
    private final DailyEntryRepository dailyEntryRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<SupplementDefinition> getAll(@AuthenticationPrincipal User user) {
        return repository.findByUser(user);
    }

    @PostMapping
    public SupplementDefinition create(@AuthenticationPrincipal User user, @RequestBody SupplementDefinition def) {
        def.setUser(user);
        SupplementDefinition savedDef = repository.save(def);

        LocalDate today = LocalDate.now();
        DailyEntry dailyEntry = dailyEntryRepository.findByDatum(today)
                .stream()
                .filter(e -> e.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElse(null);

        if (dailyEntry != null) {
            SupplementEntry entry = new SupplementEntry();
            entry.setName(savedDef.getName());
            entry.setMengeMg(savedDef.getMengeMg());
            entry.setGenommen(false);
            entry.setDatum(today);
            entry.setDailyEntry(dailyEntry);
            supplementEntryRepository.save(entry);
        }

        return savedDef;
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplementDefinition> update(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @RequestBody SupplementDefinition updated) {
        return repository.findById(id)
                .filter(def -> def.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setMengeMg(updated.getMengeMg());
                    existing.setEnabled(updated.isEnabled());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return repository.findById(id)
                .filter(def -> def.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    repository.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.<Void>notFound().build());
    }
}