package com.dailytracker.service;

import com.dailytracker.model.SupplementEntry;
import com.dailytracker.repository.SupplementEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SupplementEntryService {

    private final SupplementEntryRepository repository;

    public List<SupplementEntry> findAll() {
        return repository.findAll();
    }

    public Optional<SupplementEntry> findById(Long id) {
        return repository.findById(id);
    }

    public List<SupplementEntry> findByDailyEntryId(Long dailyEntryId) {
        return repository.findByDailyEntryId(dailyEntryId);
    }

    public SupplementEntry save(SupplementEntry entry) {
        return repository.save(entry);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
