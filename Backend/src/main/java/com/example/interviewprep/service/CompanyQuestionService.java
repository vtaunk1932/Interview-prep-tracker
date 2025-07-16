package com.example.interviewprep.service;

import com.example.interviewprep.dto.CompanyProgressDTO;
import com.example.interviewprep.model.CompanyQuestion;
import com.example.interviewprep.repository.CompanyQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CompanyQuestionService {
@Autowired
    private final CompanyQuestionRepository companyQuestionRepository;

    public CompanyQuestionService(CompanyQuestionRepository companyQuestionRepository) {
        this.companyQuestionRepository = companyQuestionRepository;
    }

    public List<CompanyProgressDTO> getCompanyProgress() {
        List<CompanyQuestion> questions = companyQuestionRepository.findAll();

        Map<String, Long> totalMap = questions.stream()
                .collect(Collectors.groupingBy(CompanyQuestion::getCompany, Collectors.counting()));

        Map<String, Long> completedMap = questions.stream()
                .filter(CompanyQuestion::isCompleted) // ✅ updated here
                .collect(Collectors.groupingBy(CompanyQuestion::getCompany, Collectors.counting()));

        List<CompanyProgressDTO> progressList = new ArrayList<>();
        for (String company : totalMap.keySet()) {
            long total = totalMap.getOrDefault(company, 0L);
            long completed = completedMap.getOrDefault(company, 0L);
            progressList.add(new CompanyProgressDTO(company, total, completed));
        }

        return progressList;
    }
}
