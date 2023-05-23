package com.example.demo.repository;

import com.example.demo.domain.Assignment;
import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AssignmentRepo extends JpaRepository<Assignment, Long> {
    Assignment save(Assignment assignment);

    Set<Assignment> findByUser(User user);

    Optional<Assignment> findById(Long id);

    @Query("select a  from Assignment  a " +
            "where (a.status='submitted' and (a.codeReviewer is null or a.codeReviewer =:codeReviewer))" +
            "or  a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);
}
