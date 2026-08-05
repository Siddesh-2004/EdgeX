package com.siddesh.EdgeXSpringBootBackend.repository;

import com.siddesh.EdgeXSpringBootBackend.entity.Problem;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    // Locks the row for the duration of the transaction. If two requests call
    // generate-test-cases for the same problem at nearly the same time, the second
    // one blocks until the first commits — preventing duplicate test case batches
    // from a race condition, regardless of what triggers the duplicate call.
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Problem p where p.id = :id")
    Optional<Problem> findWithLockById(@Param("id") Long id);
}