package com.example.demo.controller;

import com.example.demo.domain.Comment;
import com.example.demo.domain.User;
import com.example.demo.dto.CommentDto;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @PostMapping("")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user){
        Comment comment =  commentService.save(commentDto, user);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<Set<Comment>> getCommentsByAssignmentId(@PathVariable Long assignmentId)
    {
        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);
        return ResponseEntity.ok(comments);
    }
}
