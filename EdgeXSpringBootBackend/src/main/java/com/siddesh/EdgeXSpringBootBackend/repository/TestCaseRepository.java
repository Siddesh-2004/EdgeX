package com.siddesh.EdgeXSpringBootBackend.repository;

import com.siddesh.EdgeXSpringBootBackend.entity.TestCase;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCaseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase, Long> {

    List<TestCase> findByProblemId(Long problemId);

    List<TestCase> findByProblemIdAndCategory(Long problemId, TestCaseCategory category);
}