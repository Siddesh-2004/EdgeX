package com.siddesh.EdgeXSpringBootBackend.dto.judge0;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Judge0 returns [{"token": "..."}, ...] immediately after a batch submit —
// results aren't ready yet, this token is used to poll for them later.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Judge0TokenResponse {

    private String token;
}