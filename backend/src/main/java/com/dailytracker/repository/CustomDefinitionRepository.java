package com.dailytracker.repository;

import com.dailytracker.model.CustomDefinition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomDefinitionRepository extends JpaRepository<CustomDefinition, Long> {
}