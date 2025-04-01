package com.dailytracker.repository;

import com.dailytracker.model.CustomEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomEntryRepository extends JpaRepository<CustomEntry, Long> {
    List<CustomEntry> findByDailyEntryId(Long dailyEntryId);
}
