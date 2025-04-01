package com.dailytracker.service;

import com.dailytracker.model.CustomEntry;
import com.dailytracker.repository.CustomEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomEntryService {

    private final CustomEntryRepository repo;

    public List<CustomEntry> findAll() {
        return repo.findAll();
    }

    public List<CustomEntry> findByDailyEntryId(Long dailyEntryId) {
        return repo.findByDailyEntryId(dailyEntryId);
    }

    public Optional<CustomEntry> findById(Long id) {
        return repo.findById(id);
    }

    public CustomEntry save(CustomEntry entry) {
        return repo.save(entry);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public Optional<CustomEntry> update(Long id, CustomEntry newEntry) {
        return repo.findById(id).map(existing -> {
            existing.setName(newEntry.getName());
            existing.setValue(newEntry.getValue());
            return repo.save(existing);
        });
    }
}
