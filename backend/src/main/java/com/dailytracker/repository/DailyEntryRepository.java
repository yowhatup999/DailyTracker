package com.dailytracker.repository;

import com.dailytracker.model.DailyEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyEntryRepository extends JpaRepository<DailyEntry, Long> {
}
