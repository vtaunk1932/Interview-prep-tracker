package com.example.interviewprep.repository;

import com.example.interviewprep.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByUserId(String userId);
    List<Topic> findByUserIdAndStatus(String userId, String status);
    List<Topic> findByUserIdAndCategory(String userId, String category);
}
