package com.example.interviewprep.controller;

import com.example.interviewprep.model.CompanyQuestion;
import com.example.interviewprep.repository.CompanyQuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-questions")
@CrossOrigin(origins = "http://localhost:3009")
public class CompanyQuestionController {

    private final CompanyQuestionRepository companyQuestionRepository;

    // Constructor injection
    public CompanyQuestionController(CompanyQuestionRepository companyQuestionRepository) {
        this.companyQuestionRepository = companyQuestionRepository;
    }

    // Get all company questions
    @GetMapping
    public List<CompanyQuestion> getAllQuestions() {
        return companyQuestionRepository.findAll();
    }

    // Get questions by company name
    @GetMapping("/company/{company}")
    public List<CompanyQuestion> getByCompany(@PathVariable String company) {
        return companyQuestionRepository.findByCompany(company);
    }

    // Add a new question
    @PostMapping
    public CompanyQuestion addQuestion(@RequestBody CompanyQuestion question) {
        return companyQuestionRepository.save(question);
    }

    // Toggle completion status
    @PutMapping("/{id}/toggle-complete")
    public ResponseEntity<CompanyQuestion> toggleComplete(@PathVariable Long id) {
        return companyQuestionRepository.findById(id).map(q -> {
            q.setCompleted(!q.isCompleted());
            companyQuestionRepository.save(q);
            return ResponseEntity.ok(q);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Update full question info
    @PutMapping("/{id}")
    public ResponseEntity<CompanyQuestion> updateQuestion(@PathVariable Long id, @RequestBody CompanyQuestion updated) {
        return companyQuestionRepository.findById(id).map(q -> {
            q.setCompany(updated.getCompany());
            q.setQuestion(updated.getQuestion());
            q.setTopic(updated.getTopic());
            q.setDifficulty(updated.getDifficulty());
            q.setCompleted(updated.isCompleted());
            return ResponseEntity.ok(companyQuestionRepository.save(q));
        }).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/bulk")
    public List<CompanyQuestion> addBulkQuestions(@RequestBody List<CompanyQuestion> questions) {
        return companyQuestionRepository.saveAll(questions);
    }

    // Delete question
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        if (companyQuestionRepository.existsById(id)) {
            companyQuestionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
