package com.example.demo.service;

import com.example.demo.domain.Assignment;
import com.example.demo.domain.Comment;
import com.example.demo.domain.User;
import com.example.demo.dto.CommentDto;
import com.example.demo.repository.AssignmentRepo;
import com.example.demo.repository.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    CommentRepo commentRepo;
    @Autowired
    AssignmentRepo assignmentRepo;

    public Comment save(CommentDto commentDto, User user){
        Comment comment = new Comment();
        Assignment assignment = assignmentRepo.getById(commentDto.getAssignmentId());
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        comment.setAssignment(assignment);
        comment.setCreatedDate(LocalDateTime.now());
        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId){
        return commentRepo.findByAssignmentId(assignmentId);
    }
}
