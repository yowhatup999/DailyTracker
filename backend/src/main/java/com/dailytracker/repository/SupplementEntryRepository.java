package com.dailytracker.repository;

import com.dailytracker.model.SupplementEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplementEntryRepository extends JpaRepository<SupplementEntry, Long> {
    List<SupplementEntry> findByDailyEntryId(Long dailyEntryId);
}
