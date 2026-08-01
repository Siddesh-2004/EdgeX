package com.siddesh.EdgeXSpringBootBackend.dto.judge0;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

// Judge0's batch poll response is wrapped in {"submissions": [...]},
// unlike the batch submit response which is a bare array.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Judge0BatchResultResponse {

    private List<Judge0SubmissionResult> submissions;
}