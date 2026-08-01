package com.siddesh.EdgeXSpringBootBackend.dto.judge0;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

// Wraps multiple submissions under "submissions" — the shape Judge0's
// POST /submissions/batch endpoint expects.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Judge0BatchRequest {

    private List<Judge0SubmissionRequest> submissions;
}