package com.dailytracker.repository;

import com.dailytracker.model.CustomDefinition;
import com.dailytracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomDefinitionRepository extends JpaRepository<CustomDefinition, Long> {
    List<CustomDefinition> findByUser(User user);
}