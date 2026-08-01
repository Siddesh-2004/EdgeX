package com.siddesh.EdgeXSpringBootBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "constraints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Constraint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    // e.g. "n", "arr", "target"
    @Column(nullable = false)
    private String variableName;

    // e.g. INTEGER, INTEGER_ARRAY, STRING — see DataType enum.
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Datatype dataType;

    // Kept as String (not Long) since bounds may be non-numeric (e.g. string length, char range)
    // or exceed long range in edge cases.
    private String minValue;

    private String maxValue;

    // A constraint can carry multiple rules at once, e.g. SORTED + NO_DUPLICATES.
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "constraint_rules", joinColumns = @JoinColumn(name = "constraint_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "rule")
    private Set<ConstraintRule> extraRules = new HashSet<>();
}