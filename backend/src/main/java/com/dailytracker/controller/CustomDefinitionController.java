package com.dailytracker.controller;

import com.dailytracker.model.CustomDefinition;
import com.dailytracker.model.CustomEntry;
import com.dailytracker.model.DailyEntry;
import com.dailytracker.model.User;
import com.dailytracker.repository.CustomDefinitionRepository;
import com.dailytracker.repository.CustomEntryRepository;
import com.dailytracker.repository.DailyEntryRepository;
import com.dailytracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public List<CustomDefinition> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public CustomDefinition create(@RequestBody CustomDefinition definition) {
        CustomDefinition savedDef = repo.save(definition);

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

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
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}