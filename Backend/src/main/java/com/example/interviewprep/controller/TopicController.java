package com.example.interviewprep.controller;

import com.example.interviewprep.model.Topic;
import com.example.interviewprep.repository.TopicRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://localhost:3009")
public class TopicController {

    private final TopicRepository topicRepository;

    public TopicController(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    // Get all topics (admin or dev testing purpose)
    @GetMapping
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // Get topics by userId (for specific user dashboard)
    @GetMapping("/user/{userId}")
    public List<Topic> getTopicsByUser(@PathVariable String userId) {
        List<Topic> topics = topicRepository.findByUserId(userId);

        if (topics.isEmpty()) {
            // Add default topics for this user
            List<Topic> defaultTopics = List.of(
                    new Topic("Arrays", "DSA", "Easy", "Not Started", userId),
                    new Topic("Linked List", "DSA", "Medium", "Not Started", userId),
                    new Topic("System Design Basics", "System Design", "Easy", "Not Started", userId),
                    new Topic("OOP Concepts", "Core Java", "Medium", "Not Started", userId),
                    new Topic("DB Normalization", "Databases", "Easy", "Not Started", userId)
            );

            topicRepository.saveAll(defaultTopics);
            return defaultTopics;
        }

        return topics;
    }

    // Filter topics by userId and status
    @GetMapping("/user/{userId}/status/{status}")
    public List<Topic> getTopicsByUserAndStatus(@PathVariable String userId, @PathVariable String status) {
        return topicRepository.findByUserIdAndStatus(userId, status);
    }

    // Filter topics by userId and category
    @GetMapping("/user/{userId}/category/{category}")
    public List<Topic> getTopicsByUserAndCategory(@PathVariable String userId, @PathVariable String category) {
        return topicRepository.findByUserIdAndCategory(userId, category);
    }

    // Add new topic
    @PostMapping
    public Topic addTopic(@RequestBody Topic topic) {
        System.out.println("Received topic: " + topic);
        return topicRepository.save(topic);
    }

    // Update topic
    @PutMapping("/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable Long id, @RequestBody Topic updatedTopic) {
        Optional<Topic> topicOptional = topicRepository.findById(id);
        if (topicOptional.isPresent()) {
            Topic topic = topicOptional.get();
            topic.setStatus(updatedTopic.getStatus());
            topic.setIsFavorite(updatedTopic.getIsFavorite());
            topic.setIsBookmarked(updatedTopic.getIsBookmarked());
            topic.setNotes(updatedTopic.getNotes());
            topic.setCompletedDate(updatedTopic.getCompletedDate());
            topicRepository.save(topic);
            return ResponseEntity.ok(topic);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete topic
    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable Long id) {
        topicRepository.deleteById(id);
    }
}
