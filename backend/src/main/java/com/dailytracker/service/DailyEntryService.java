package com.dailytracker.service;

import com.dailytracker.model.DailyEntry;
import com.dailytracker.repository.DailyEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DailyEntryService {

    private final DailyEntryRepository repository;

    public List<DailyEntry> findAll() {
        return repository.findAll();
    }

    public Optional<DailyEntry> findById(Long id) {
        return repository.findById(id);
    }

    public DailyEntry save(DailyEntry entry) {
        return repository.save(entry);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Optional<DailyEntry> updateEntry(Long id, DailyEntry updatedEntry) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setDatum(updatedEntry.getDatum());
                    existing.setSchritte(updatedEntry.getSchritte());
                    existing.setSchlafStunden(updatedEntry.getSchlafStunden());
                    existing.setWasserMl(updatedEntry.getWasserMl());
                    existing.setWetterTemp(updatedEntry.getWetterTemp());
                    existing.setWetterLuftdruck(updatedEntry.getWetterLuftdruck());
                    existing.setMondphase(updatedEntry.getMondphase());
                    return repository.save(existing);
                });
    }

}
