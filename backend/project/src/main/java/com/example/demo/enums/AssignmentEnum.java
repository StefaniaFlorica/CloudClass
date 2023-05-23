package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1,"Typescript"),
    ASSIGNMENT_2(2, "Guessing Game"),
    ASSIGNMENT_3(3, "Styling"),
    ASSIGNMENT_4(4 , "Components"),
    ASSIGNMENT_5(5, "State"),
    ASSIGNMENT_6(6, "Hooks"),
    ASSIGNMENT_7(7, "Local Storage"),
    ASSIGNMENT_8(8, "Global State Management"),
    ASSIGNMENT_9(9, "API Requests"),
    ASSIGNMENT_10(10, "Connectiong FE with BE"),
    ASSIGNMENT_11(11, "Final Project");

    private Integer assignmentNumber;
    private String assignmentName;
    AssignmentEnum(int assignmentNumber,String assignmentName){
        this.assignmentNumber = assignmentNumber;
        this.assignmentName = assignmentName;
    }

    public Integer getAssignmentNumber() {
        return assignmentNumber;
    }

    public String getAssignmentName() {
        return assignmentName;
    }
}
