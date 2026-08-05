package com.siddesh.EdgeXSpringBootBackend.service;

import com.siddesh.EdgeXSpringBootBackend.dto.request.CreateProblemRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.ProblemResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Problem;
import com.siddesh.EdgeXSpringBootBackend.exception.ResourceNotFoundException;
import com.siddesh.EdgeXSpringBootBackend.mapper.ProblemMapper;
import com.siddesh.EdgeXSpringBootBackend.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepository;

    @Transactional
    public ProblemResponse createProblem(CreateProblemRequest request) {
        Problem problem = ProblemMapper.toEntity(request);
        Problem saved = problemRepository.save(problem);
        return ProblemMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ProblemResponse getProblem(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", id));
        return ProblemMapper.toResponse(problem);
    }

    @Transactional(readOnly = true)
    public List<ProblemResponse> getAllProblems() {
        return problemRepository.findAll().stream()
                .map(ProblemMapper::toResponse)
                .toList();
    }

    @Transactional
    public void deleteProblem(Long id) {
        if (!problemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Problem", id);
        }
        problemRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllProblems() {
        problemRepository.deleteAll();
    }
}