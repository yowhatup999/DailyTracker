package com.dailytracker.controller;

import com.dailytracker.model.CustomEntryTemplate;
import com.dailytracker.repository.CustomEntryTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/custom-template")
@RequiredArgsConstructor
public class CustomEntryTemplateController {

    private final CustomEntryTemplateRepository repo;

    @GetMapping
    public List<CustomEntryTemplate> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public CustomEntryTemplate create(@RequestBody CustomEntryTemplate template) {
        return repo.save(template);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
