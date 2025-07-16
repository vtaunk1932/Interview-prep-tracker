package com.example.interviewprep;

import com.example.interviewprep.model.CompanyQuestion;
import com.example.interviewprep.repository.CompanyQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InterviewprepApplication {

    public static void main(String[] args) {
        SpringApplication.run(InterviewprepApplication.class, args);
    }

    // ✅ Add this inside the same class
    @Bean
    CommandLineRunner runner(CompanyQuestionRepository repository) {
        return args -> {
            repository.save(new CompanyQuestion(null, "Amazon", "Find the longest substring...", "Strings", "Medium", false));
            repository.save(new CompanyQuestion(null, "Google", "Design a URL shortener...", "System Design", "Hard", false));
            repository.save(new CompanyQuestion(null, "Infosys", "What is polymorphism in OOP?", "OOPs", "Easy", false));
        };
    }
}
