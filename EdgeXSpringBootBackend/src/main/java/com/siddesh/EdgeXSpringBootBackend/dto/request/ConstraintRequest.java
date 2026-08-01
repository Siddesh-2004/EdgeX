package com.siddesh.EdgeXSpringBootBackend.dto.request;

import com.siddesh.EdgeXSpringBootBackend.entity.ConstraintRule;
import com.siddesh.EdgeXSpringBootBackend.entity.Datatype;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConstraintRequest {

    @NotBlank
    private String variableName;

    @NotNull
    private Datatype dataType;

    @NotBlank
    private String minValue;

    @NotBlank
    private String maxValue;

    private Set<ConstraintRule> extraRules = new HashSet<>();
}