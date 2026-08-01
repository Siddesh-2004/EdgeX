package com.siddesh.EdgeXSpringBootBackend.dto.response;

import com.siddesh.EdgeXSpringBootBackend.entity.ConstraintRule;
import com.siddesh.EdgeXSpringBootBackend.entity.Datatype;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConstraintResponse {

    private Long id;
    private String variableName;
    private Datatype dataType;
    private String minValue;
    private String maxValue;
    private Set<ConstraintRule> extraRules;
}