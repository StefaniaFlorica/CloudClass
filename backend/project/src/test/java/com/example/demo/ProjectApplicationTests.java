package com.example.demo;
import com.example.demo.domain.Assignment;
import com.example.demo.domain.User;
import com.example.demo.service.AssignmentService;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import javax.transaction.Transactional;

import static org.junit.Assert.assertNotNull;

@SpringBootTest
@Transactional
class ProjectApplicationTests {

	@Autowired
	private AssignmentService assignmentService;

	@Autowired
	private UserService userService;

	@Test
	public void testAddAssignment() {
		User user = userService.findUserByUsername("student1").orElse(new User());
		Assignment assignment = assignmentService.save(user);
		assertNotNull(assignment.getId());
	}

}
