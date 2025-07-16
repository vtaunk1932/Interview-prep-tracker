package com.example.interviewprep.dto;


public class CompanyProgressDTO {
    private String company;
    private long total;
    private long completed;

    public CompanyProgressDTO(String company, long total, long completed) {
        this.company = company;
        this.total = total;
        this.completed = completed;
    }

    public String getCompany() {
        return company;
    }

    public long getTotal() {
        return total;
    }

    public long getCompleted() {
        return completed;
    }
}
