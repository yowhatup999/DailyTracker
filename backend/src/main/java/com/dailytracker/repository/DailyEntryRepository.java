package com.dailytracker.repository;

import com.dailytracker.model.DailyEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyEntryRepository extends JpaRepository<DailyEntry, Long> {

    List<DailyEntry> findByDatum(LocalDate datum);

    @Query("SELECT e FROM DailyEntry e WHERE YEAR(e.datum) = :jahr AND MONTH(e.datum) = :monat")
    List<DailyEntry> findByMonatUndJahr(@Param("monat") int monat, @Param("jahr") int jahr);

    @Query("SELECT e FROM DailyEntry e WHERE YEAR(e.datum) = :jahr")
    List<DailyEntry> findByJahr(@Param("jahr") int jahr);
}
