package com.example.interviewprep.repository;

import com.example.interviewprep.model.CompanyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyQuestionRepository extends JpaRepository<CompanyQuestion, Long> {
    List<CompanyQuestion> findByCompany(String company);
}
