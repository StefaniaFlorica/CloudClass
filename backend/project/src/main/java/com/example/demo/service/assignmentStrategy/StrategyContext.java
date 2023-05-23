package com.example.demo.service.assignmentStrategy;

import com.example.demo.domain.Assignment;
import com.example.demo.domain.User;
import com.example.demo.enums.AuthorityEnum;
import com.example.demo.service.AssignmentService;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;

public class StrategyContext {
    private AssignmentStrategy strategy;
    private AssignmentService assignmentService;
    private User user;

    public StrategyContext(AssignmentService assignmentService, User user) {
        this.assignmentService = assignmentService;
        this.user = user;
        boolean hasCodeReviewerRole = user.getAuthorities()
                .stream()
                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
                .count() > 0;
        if (hasCodeReviewerRole) {
            strategy = new CodeReviewerStrategy();
        } else {
            strategy = new StudentStrategy();
        }
    }

    public Set<Assignment> getAssignments() {
        return strategy.execute(assignmentService, user);
    }


}
