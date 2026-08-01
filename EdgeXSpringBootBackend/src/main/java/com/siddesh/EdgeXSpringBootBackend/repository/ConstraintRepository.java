package com.siddesh.EdgeXSpringBootBackend.repository;

import com.siddesh.EdgeXSpringBootBackend.entity.Constraint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConstraintRepository extends JpaRepository<Constraint, Long> {

    List<Constraint> findByProblemId(Long problemId);
}