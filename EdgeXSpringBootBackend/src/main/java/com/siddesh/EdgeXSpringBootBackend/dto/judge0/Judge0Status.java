package com.siddesh.EdgeXSpringBootBackend.dto.judge0;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Judge0 status codes: 1 = In Queue, 2 = Processing (not terminal — keep polling).
// 3 = Accepted, 4 = Wrong Answer, 5 = TLE, 6 = Compilation Error, 7-12 = various
// runtime errors (all terminal — stop polling).
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Judge0Status {

    private int id;
    private String description;

    public boolean isTerminal() {
        return id >= 3;
    }
}