package com.siddesh.EdgeXSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sourceCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Language language;

    // Placeholder as String for now — e.g. "PENDING", "ACCEPTED", "WRONG_ANSWER".
    // Will convert to a proper enum once the final status set is locked in.
    @Column(nullable = false)
    private String overallStatus;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubmissionResult> results = new ArrayList<>();
}