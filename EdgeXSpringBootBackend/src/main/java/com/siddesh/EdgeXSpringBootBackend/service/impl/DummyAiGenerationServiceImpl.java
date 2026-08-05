package com.siddesh.EdgeXSpringBootBackend.service.impl;

import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0SubmissionResult;
import com.siddesh.EdgeXSpringBootBackend.entity.Language;
import com.siddesh.EdgeXSpringBootBackend.entity.Problem;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCase;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCaseCategory;
import com.siddesh.EdgeXSpringBootBackend.exception.ResourceNotFoundException;
import com.siddesh.EdgeXSpringBootBackend.repository.ProblemRepository;
import com.siddesh.EdgeXSpringBootBackend.repository.TestCaseRepository;
import com.siddesh.EdgeXSpringBootBackend.service.AiGenerationService;
import com.siddesh.EdgeXSpringBootBackend.service.JudgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DummyAiGenerationServiceImpl implements AiGenerationService {

    private static final String TWO_SUM_SOLUTION = """
            #include <bits/stdc++.h>
            using namespace std;

            int main() {
                string line;
                getline(cin, line);
                stringstream ss(line);
                vector<int> nums;
                int x;
                while (ss >> x) nums.push_back(x);

                int target;
                cin >> target;

                for (int i = 0; i < nums.size(); i++) {
                    for (int j = i + 1; j < nums.size(); j++) {
                        if (nums[i] + nums[j] == target) {
                            cout << i << " " << j << endl;
                            return 0;
                        }
                    }
                }
                return 0;
            }
            """;

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final JudgeService judgeService;

    @Override
    @Transactional
    public void generateAndPopulateTestCases(Long problemId) {
        Problem problem = problemRepository.findWithLockById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", problemId));

        problem.setSolution(TWO_SUM_SOLUTION);
        problem.setSolutionLanguage(Language.CPP);

        // 1. Clear old generated test cases (retaining EXAMPLE ones)
        problem.getTestCases().removeIf(tc -> tc.getCategory() != TestCaseCategory.EXAMPLE);

        // 2. Build new test cases and persist them directly via child repository
        List<TestCase> newTestCases = buildHardcodedTestCases(problem);

        // saveAllAndFlush directly on testCaseRepository returns the MANAGED instances assigned with DB IDs
        List<TestCase> persistedTestCases = testCaseRepository.saveAllAndFlush(newTestCases);

        // 3. Attach managed instances to problem collection to keep bidirectionality in sync
        problem.getTestCases().addAll(persistedTestCases);
        problemRepository.save(problem);

        // 4. Pass MANAGED test cases to Judge0
        Map<String, TestCase> tokenToTestCase =
                judgeService.submitBatch(persistedTestCases, TWO_SUM_SOLUTION, Language.CPP);

        List<Judge0SubmissionResult> results =
                judgeService.pollBatchResults(new ArrayList<>(tokenToTestCase.keySet()));

        // 5. Update the exact managed objects and explicitly flush changes back to the DB
        for (Judge0SubmissionResult result : results) {
            TestCase testCase = tokenToTestCase.get(result.getToken());
            if (testCase != null) {
                String output = result.getStdout() != null ? result.getStdout().trim() : "";
                testCase.setExpectedOutput(output);
            }
        }

        // Guarantees all updated expectedOutputs are flushed to DB before transaction completes
        testCaseRepository.saveAllAndFlush(persistedTestCases);
    }

    private List<TestCase> buildHardcodedTestCases(Problem problem) {
        List<TestCase> testCases = new ArrayList<>();

        testCases.add(buildTestCase(problem, "2 7 11 15\n9", TestCaseCategory.BASIC));
        testCases.add(buildTestCase(problem, "3 2 4\n6", TestCaseCategory.BASIC));
        testCases.add(buildTestCase(problem, "3 3\n6", TestCaseCategory.EDGE));
        testCases.add(buildTestCase(problem, "-1 -2 -3 -4\n-6", TestCaseCategory.EDGE));

        return testCases;
    }

    private TestCase buildTestCase(Problem problem, String input, TestCaseCategory category) {
        TestCase testCase = new TestCase();
        testCase.setProblem(problem);
        testCase.setInput(input);
        testCase.setCategory(category);
        return testCase;
    }
}