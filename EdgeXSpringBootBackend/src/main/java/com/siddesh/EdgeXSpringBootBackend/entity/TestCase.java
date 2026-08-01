package com.siddesh.EdgeXSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "test_cases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String input;

    @Column(columnDefinition = "TEXT")
    private String expectedOutput;

    // Placeholder as String for now — will convert to a proper enum
    // once the final set of categories (example, cornerCase, duplicates, etc.) is locked in.
    @Column(nullable = false)
    private String category;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;
}