package com.example.demo.controller;

import com.example.demo.domain.Assignment;
import com.example.demo.domain.Authority;
import com.example.demo.domain.User;
import com.example.demo.dto.AssignmentResponseDto;
import com.example.demo.enums.AuthorityEnum;
import com.example.demo.service.AssignmentService;
import com.example.demo.service.UserService;
import com.example.demo.service.assignmentStrategy.StrategyContext;
import com.example.demo.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;
    @PostMapping("")
    // a ResponseEntity returns the metadata and the assignment itself
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);

        return ResponseEntity.ok(newAssignment);
    }


    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        StrategyContext strategyContext = new StrategyContext(assignmentService, user);

        Set<Assignment> assignmentList = strategyContext.getAssignments();

        return ResponseEntity.ok(assignmentList);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getAssignment(@PathVariable Long id, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.getAssignmentById(id);
        return ResponseEntity.ok(new AssignmentResponseDto(assignmentOpt.orElse(new Assignment())));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long id, @RequestBody Assignment assignment, @AuthenticationPrincipal User user) {

        if(assignment.getCodeReviewer()!=null){
            User codeReviewer = assignment.getCodeReviewer();;
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());

            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(),codeReviewer))
            {
                assignment.setCodeReviewer(codeReviewer);
            }
        }
        Assignment newAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(newAssignment);
    }

}
