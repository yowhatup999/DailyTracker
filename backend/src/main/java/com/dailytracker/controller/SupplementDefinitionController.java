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
import org.springframework.security.core.context.SecurityContextHolder;
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
    public List<SupplementDefinition> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public SupplementDefinition create(@RequestBody SupplementDefinition def) {
        SupplementDefinition savedDef = repository.save(def);

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

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
    public ResponseEntity<SupplementDefinition> update(@PathVariable Long id, @RequestBody SupplementDefinition updated) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setMengeMg(updated.getMengeMg());
                    existing.setEnabled(updated.isEnabled());
                    return ResponseEntity.ok(repository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
