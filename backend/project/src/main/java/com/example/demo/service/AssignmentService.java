package com.example.demo.service;

import com.example.demo.domain.Assignment;
import com.example.demo.domain.User;
import com.example.demo.enums.AssignmentStatusEnum;
import com.example.demo.repository.AssignmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepo assignmentRepo;

    public Assignment save(User user){
        Assignment assignment =  new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);
        return assignmentRepo.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user){
        Set<Assignment> assignmentsByUser = assignmentRepo.findByUser(user);
        if(assignmentsByUser == null || assignmentsByUser.size() == 0){
            return 1;
        }
        Integer lastNum = 0;
        for(Assignment assignment: assignmentsByUser){
            if(assignment.getNumber() != null && assignment.getNumber() > lastNum){
                lastNum = assignment.getNumber();
            }
        }
        return lastNum + 1;
    }
    public Assignment save(Assignment assignment)
    {
        return assignmentRepo.save(assignment);
    }
    public Set<Assignment> getAllForStudent(User user)
    {
        return assignmentRepo.findByUser(user);
    }

    public Set<Assignment> getAllForCodeReviewer(User user)
    {
        return assignmentRepo.findByCodeReviewer(user);
    }

    public Optional<Assignment> getAssignmentById(Long id)
    {
        return assignmentRepo.findById(id);
    }

}
