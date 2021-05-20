package com.robertbuckley.yourJamsProject.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.robertbuckley.yourJamsProject.models.User;
import com.robertbuckley.yourJamsProject.repositories.UserRepository;

@Component
public class UserValidator{
	@Autowired
	private UserRepository uRepo;
	
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}
	
	public void validate(Object target, Errors errors) {
        User user = (User) target;
//      CHECK TO SEE IF PASSWORD AND CONFIRM PASSWORD MATCH
        if (!user.getPasswordConfirmation().equals(user.getPassword())) {
            errors.rejectValue("passwordConfirmation", "Match", "Passwords do not match!");
        }
//      CHECK TO SEE IF EMAIL IS UNIQUE IN DB
        if(this.uRepo.existsByEmail(user.getEmail())) {
        	errors.rejectValue("email", "Dupe", "Email is already in use!");
        }
		
	}
}
