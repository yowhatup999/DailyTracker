package com.dailytracker.controller;

import com.dailytracker.model.SupplementDefinition;
import com.dailytracker.repository.SupplementDefinitionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplement-definition")
@RequiredArgsConstructor
public class SupplementDefinitionController {

    private final SupplementDefinitionRepository repository;

    @GetMapping
    public List<SupplementDefinition> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public SupplementDefinition create(@RequestBody SupplementDefinition def) {
        return repository.save(def);
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
