package com.siddesh.EdgeXSpringBootBackend.dto.judge0;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Judge0SubmissionResult {

    private String token;
    private Judge0Status status;
    private String stdout;
    private String stderr;
    private String time;
    private Integer memory;

    @Override
    public String toString() {
        return "Judge0SubmissionResult{" +
                "token='" + token + '\'' +
                ", status=" + status +
                ", stdout='" + stdout + '\'' +
                ", stderr='" + stderr + '\'' +
                ", time='" + time + '\'' +
                ", memory=" + memory +
                '}';
    }
}