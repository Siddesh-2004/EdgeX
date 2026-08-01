package com.siddesh.EdgeXSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "submission_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private Submission submission;

    @ManyToOne
    @JoinColumn(name = "test_case_id", nullable = false)
    private TestCase testCase;

    @Column(columnDefinition = "TEXT")
    private String actualOutput;

    @Column(nullable = false)
    private boolean passed;

    // e.g. "Accepted", "Wrong Answer", "Time Limit Exceeded" — mirrors Judge0 status naming.
    @Column(nullable = false)
    private String status;

    private Integer executionTimeMs;
}