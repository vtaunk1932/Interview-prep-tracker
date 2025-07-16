package com.example.interviewprep.controller;
import com.example.interviewprep.service.CompanyQuestionService;

import com.example.interviewprep.dto.CompanyProgressDTO;
import com.example.interviewprep.model.CompanyQuestion;
import com.example.interviewprep.repository.CompanyQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:3000") // Adjust port if needed
public class StatsController {

    @Autowired
    private CompanyQuestionRepository companyQuestionRepository;
    @Autowired
    private CompanyQuestionService companyQuestionService;

    // 1. Status Overview
    @GetMapping("/status")
    public List<Map<String, Object>> getStatusStats() {
        List<CompanyQuestion> questions = companyQuestionRepository.findAll();

        Map<String, Long> statusCount = questions.stream()
                .collect(Collectors.groupingBy(
                        q -> q.isCompleted() ? "Completed" : "Not Started",
                        Collectors.counting()
                ));

        // Optionally add "In Progress" if your model supports it
        return formatToList(statusCount);
    }

    // 2. Category Breakdown
    @GetMapping("/category")
    public List<Map<String, Object>> getCategoryStats() {
        List<CompanyQuestion> questions = companyQuestionRepository.findAll();

        Map<String, Long> categoryCount = questions.stream()
                .collect(Collectors.groupingBy(
                        CompanyQuestion::getTopic,
                        Collectors.counting()
                ));

        return formatToList(categoryCount);
    }

    // 3. Company-wise Breakdown
    @GetMapping("/company")
    public List<Map<String, Object>> getCompanyStats() {
        List<CompanyQuestion> questions = companyQuestionRepository.findAll();

        Map<String, Long> companyCount = questions.stream()
                .collect(Collectors.groupingBy(
                        CompanyQuestion::getCompany,
                        Collectors.counting()
                ));

        return formatToList(companyCount);
    }

    // 4. Difficulty Breakdown
    @GetMapping("/difficulty")
    public List<Map<String, Object>> getDifficultyStats() {
        List<CompanyQuestion> questions = companyQuestionRepository.findAll();

        Map<String, Long> difficultyCount = questions.stream()
                .collect(Collectors.groupingBy(
                        CompanyQuestion::getDifficulty,
                        Collectors.counting()
                ));

        return formatToList(difficultyCount);
    }
    @GetMapping("/company-progress")
    public ResponseEntity<List<CompanyProgressDTO>> getCompanyProgress() {
        List<CompanyProgressDTO> progressData = companyQuestionService.getCompanyProgress();
        return ResponseEntity.ok(progressData);
    }


    // Helper to convert Map<String, Long> to [{name: ..., value: ...}]
    private List<Map<String, Object>> formatToList(Map<String, Long> map) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (Map.Entry<String, Long> entry : map.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", entry.getKey());
            item.put("value", entry.getValue());
            list.add(item);
        }
        return list;
    }
}
