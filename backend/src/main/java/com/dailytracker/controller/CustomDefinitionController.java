package com.dailytracker.controller;

import org.springframework.http.ResponseEntity;
import com.dailytracker.model.CustomDefinition;
import com.dailytracker.model.CustomEntry;
import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.User;
import com.dailytracker.repository.CustomDefinitionRepository;
import com.dailytracker.repository.CustomEntryRepository;
import com.dailytracker.repository.DailyEntryRepository;
import com.dailytracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/custom-definition")
@RequiredArgsConstructor
public class CustomDefinitionController {

    private final CustomDefinitionRepository repo;
    private final CustomEntryRepository customEntryRepository;
    private final DailyEntryRepository dailyEntryRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<CustomDefinition> getAll(@AuthenticationPrincipal User user) {
        return repo.findByUser(user);
    }

    @PostMapping
    public CustomDefinition create(@AuthenticationPrincipal User user, @RequestBody CustomDefinition definition) {
        definition.setUser(user);
        CustomDefinition savedDef = repo.save(definition);

        LocalDate today = LocalDate.now();
        DailyEntry dailyEntry = dailyEntryRepository.findByDatum(today)
                .stream()
                .filter(e -> e.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElse(null);

        if (dailyEntry != null) {
            CustomEntry entry = new CustomEntry();
            entry.setName(savedDef.getName());
            entry.setUnit(savedDef.getUnit());
            entry.setValue(null);
            entry.setDailyEntry(dailyEntry);
            customEntryRepository.save(entry);
        }

        return savedDef;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return repo.findById(id)
                .filter(def -> def.getUser() != null && def.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    repo.deleteById(id);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}