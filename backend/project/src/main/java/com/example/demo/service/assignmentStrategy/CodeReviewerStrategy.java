package com.example.demo.service.assignmentStrategy;

import com.example.demo.domain.Assignment;
import com.example.demo.domain.User;
import com.example.demo.service.AssignmentService;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;

public class CodeReviewerStrategy implements AssignmentStrategy{
    @Override
    public Set<Assignment> execute(AssignmentService assignmentService, User user) {
        return assignmentService.getAllForCodeReviewer(user);
    }
}
