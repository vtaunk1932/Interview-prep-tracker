package com.example.interviewprep;

import com.example.interviewprep.model.Topic;
import com.example.interviewprep.repository.TopicRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder {

    private final TopicRepository topicRepository;

    public DataSeeder(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @PostConstruct
    public void seedDatabase() {
        if (topicRepository.count() == 0) {
            List<Topic> defaultTopics = List.of(
                    Topic.builder()
                            .userId("default-user")
                            .name("Arrays")
                            .category("DSA")
                            .difficulty("Easy")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build(),

                    Topic.builder()
                            .userId("default-user")
                            .name("Linked Lists")
                            .category("DSA")
                            .difficulty("Medium")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build(),

                    Topic.builder()
                            .userId("default-user")
                            .name("System Design Basics")
                            .category("System Design")
                            .difficulty("Medium")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build(),

                    Topic.builder()
                            .userId("default-user")
                            .name("Behavioral Questions")
                            .category("HR")
                            .difficulty("Easy")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build(),

                    Topic.builder()
                            .userId("default-user")
                            .name("Trees & Graphs")
                            .category("DSA")
                            .difficulty("Hard")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build(),

                    Topic.builder()
                            .userId("default-user")
                            .name("SQL Queries")
                            .category("Databases")
                            .difficulty("Medium")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build(),

                    Topic.builder()
                            .userId("default-user")
                            .name("Operating Systems")
                            .category("CS Fundamentals")
                            .difficulty("Hard")
                            .status("Not Started")
                            .isFavorite(false)
                            .isBookmarked(false)
                            .notes("")
                            .completedDate(null)
                            .build()
            );

            topicRepository.saveAll(defaultTopics);
            System.out.println("✅ Default topics seeded into the database.");
        } else {
            System.out.println("ℹ️ Database already contains topics. Skipping seeding.");
        }
    }
}
