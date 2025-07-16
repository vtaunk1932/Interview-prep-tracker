package com.example.interviewprep.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String name;
    private String category;
    private String difficulty;
    private String status;
    private String notes;

    @JsonProperty("isFavorite")
    private boolean isFavorite;

    @JsonProperty("isBookmarked")
    private boolean isBookmarked;

    private String completedDate;
    public boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(boolean favorite) {
        this.isFavorite = favorite;
    }

    public boolean getIsBookmarked() {
        return isBookmarked;
    }

    public void setIsBookmarked(boolean bookmarked) {
        this.isBookmarked = bookmarked;
    }
    public Topic(String name, String category, String difficulty, String status, String userId) {
        this.name = name;
        this.category = category;
        this.difficulty = difficulty;
        this.status = status;
        this.userId = userId;
        this.notes = "";
        this.isFavorite = false;
        this.isBookmarked = false;
        this.completedDate = "";
    }


}
