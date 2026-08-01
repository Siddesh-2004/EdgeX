package com.siddesh.EdgeXSpringBootBackend.mapper;

import com.siddesh.EdgeXSpringBootBackend.dto.request.ConstraintRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.ConstraintResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Constraint;
import com.siddesh.EdgeXSpringBootBackend.entity.Problem;

public class ConstraintMapper {

    private ConstraintMapper() {
        // utility class, no instances
    }

    public static Constraint toEntity(ConstraintRequest request, Problem problem) {
        Constraint constraint = new Constraint();
        constraint.setProblem(problem);
        constraint.setVariableName(request.getVariableName());
        constraint.setDataType(request.getDataType());
        constraint.setMinValue(request.getMinValue());
        constraint.setMaxValue(request.getMaxValue());
        constraint.setExtraRules(request.getExtraRules());
        return constraint;
    }

    public static ConstraintResponse toResponse(Constraint constraint) {
        ConstraintResponse response = new ConstraintResponse();
        response.setId(constraint.getId());
        response.setVariableName(constraint.getVariableName());
        response.setDataType(constraint.getDataType());
        response.setMinValue(constraint.getMinValue());
        response.setMaxValue(constraint.getMaxValue());
        response.setExtraRules(constraint.getExtraRules());
        return response;
    }
}