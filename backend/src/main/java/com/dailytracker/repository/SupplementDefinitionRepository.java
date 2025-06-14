package com.dailytracker.repository;

import com.dailytracker.model.SupplementDefinition;
import com.dailytracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplementDefinitionRepository extends JpaRepository<SupplementDefinition, Long> {
    List<SupplementDefinition> findByUser(User user);
}