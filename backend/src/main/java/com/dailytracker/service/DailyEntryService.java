package com.dailytracker.service;

import com.dailytracker.model.*;
import com.dailytracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DailyEntryService {

    private final DailyEntryRepository dailyEntryRepository;
    private final CustomEntryTemplateRepository customEntryTemplateRepository;
    private final SupplementDefinitionRepository supplementDefinitionRepository;
    private final UserRepository userRepository;
    private final AstroApiService astroApiService;

    public List<DailyEntry> findAll() {
        return dailyEntryRepository.findAll();
    }

    public Optional<DailyEntry> findById(Long id) {
        return dailyEntryRepository.findById(id);
    }

    public void deleteById(Long id) {
        dailyEntryRepository.deleteById(id);
    }

    public Optional<DailyEntry> updateEntry(Long id, DailyEntry updatedEntry) {
        return dailyEntryRepository.findById(id).map(existing -> {
            existing.setDatum(updatedEntry.getDatum());
            existing.setSchritte(updatedEntry.getSchritte());
            existing.setSchlafStunden(updatedEntry.getSchlafStunden());
            existing.setWasserMl(updatedEntry.getWasserMl());
            existing.setWetterTemp(updatedEntry.getWetterTemp());
            existing.setWetterLuftdruck(updatedEntry.getWetterLuftdruck());
            existing.setMondphase(updatedEntry.getMondphase());
            existing.setWetterStatus(updatedEntry.getWetterStatus());
            return dailyEntryRepository.save(existing);
        });
    }

    public void updateMissingAstroData(DailyEntry entry) {
        boolean updated = false;

        if (entry.getWetterTemp() == null || entry.getWetterStatus() == null || entry.getWetterLuftdruck() == null) {
            var weather = astroApiService.fetchCurrentWeather();
            if (weather != null) {
                entry.setWetterTemp(weather.getTemperature());
                entry.setWetterLuftdruck(weather.getPressure());
                entry.setWetterStatus(weather.getStatus());
                updated = true;
            }
        }

        if (entry.getMondphase() == null) {
            var moon = astroApiService.fetchCurrentMoonPhase();
            if (moon != null) {
                entry.setMondphase(moon.getPhase());
                updated = true;
            }
        }

        if (updated) {
            dailyEntryRepository.save(entry);
        }
    }

    public DailyEntry createWithCustomEntries(DailyEntry entry) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        entry.setUser(user);

        List<CustomEntryTemplate> templates = customEntryTemplateRepository.findAll();
        List<CustomEntry> customEntries = new ArrayList<>();
        for (CustomEntryTemplate t : templates) {
            if (t.isEnabled()) {
                CustomEntry c = new CustomEntry();
                c.setName(t.getName());
                c.setValue("");
                c.setUnit(t.getUnit());
                c.setDailyEntry(entry);
                customEntries.add(c);
            }
        }
        entry.setCustomEntries(customEntries);

        List<SupplementDefinition> defs = supplementDefinitionRepository.findAll();
        List<SupplementEntry> supplementEntries = new ArrayList<>();
        for (SupplementDefinition def : defs) {
            if (def.isEnabled()) {
                SupplementEntry s = new SupplementEntry();
                s.setName(def.getName());
                s.setMengeMg(def.getMengeMg());
                s.setGenommen(false);
                s.setDatum(entry.getDatum());
                s.setDailyEntry(entry);
                supplementEntries.add(s);
            }
        }
        entry.setSupplements(supplementEntries);

        return dailyEntryRepository.save(entry);
    }

    public DailyEntry getOrCreateTodayForCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return getOrCreateTodayForUser(user);
    }

    public DailyEntry getOrCreateTodayForUser(User user) {
        LocalDate today = LocalDate.now();
        List<DailyEntry> existing = dailyEntryRepository.findByDatum(today);
        for (DailyEntry e : existing) {
            if (e.getUser().getId().equals(user.getId())) {
                return e;
            }
        }

        DailyEntry newEntry = new DailyEntry();
        newEntry.setDatum(today);
        newEntry.setUser(user);
        newEntry.setSchritte(0);
        newEntry.setWasserMl(0);
        newEntry.setSchlafStunden(0);
        newEntry.setWetterTemp(null);
        newEntry.setWetterLuftdruck(null);
        newEntry.setWetterStatus(null);
        newEntry.setMondphase(null);

        return createWithCustomEntries(newEntry);
    }

    public List<DailyEntry> findByDatum(LocalDate datum) {
        return dailyEntryRepository.findByDatum(datum);
    }

    public List<DailyEntry> findByMonatUndJahr(int monat, int jahr) {
        return dailyEntryRepository.findByMonatUndJahr(monat, jahr);
    }

    public List<DailyEntry> findByJahr(int jahr) {
        return dailyEntryRepository.findByJahr(jahr);
    }

    public Optional<DailyEntry> patchEntry(Long id, DailyEntry patchData) {
        return dailyEntryRepository.findById(id).map(entry -> {
            if (patchData.getSchritte() != null) {
                entry.setSchritte(patchData.getSchritte());
            }
            if (patchData.getWasserMl() != null) {
                entry.setWasserMl(patchData.getWasserMl());
            }
            return dailyEntryRepository.save(entry);
        });
    }

}