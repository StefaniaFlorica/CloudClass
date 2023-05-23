package com.example.demo.dto;

import com.example.demo.domain.Assignment;
import com.example.demo.enums.AssignmentEnum;
import com.example.demo.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }

    public void setAssignmentEnums(AssignmentEnum[] assignmentEnums) {
        this.assignmentEnums = assignmentEnums;
    }

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }

    public void setStatusEnums(AssignmentStatusEnum[] statusEnums) {
        this.statusEnums = statusEnums;
    }
}
