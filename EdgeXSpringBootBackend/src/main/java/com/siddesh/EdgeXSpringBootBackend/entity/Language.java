package com.siddesh.EdgeXSpringBootBackend.entity;

// Each constant carries its corresponding Judge0 language ID directly,
// so no separate HashMap lookup is needed elsewhere in the codebase.
public enum Language {
    CPP(54),          // C++ (GCC 9.2.0)
    JAVA(62),          // Java (OpenJDK 13.0.1)
    PYTHON(71),        // Python (3.8.1)
    JAVASCRIPT(63),    // JavaScript (Node.js 12.14.0)
    C(50),             // C (GCC 9.2.0)
    GO(60),            // Go (1.13.5)
    RUST(73);          // Rust (1.40.0)

    private final int judge0Id;

    Language(int judge0Id) {
        this.judge0Id = judge0Id;
    }

    public int getJudge0Id() {
        return judge0Id;
    }
}