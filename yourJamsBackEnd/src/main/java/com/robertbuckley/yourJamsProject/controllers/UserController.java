package com.robertbuckley.yourJamsProject.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.robertbuckley.yourJamsProject.models.User;
import com.robertbuckley.yourJamsProject.services.UserService;
import com.robertbuckley.yourJamsProject.validators.UserValidator;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	@Autowired 
	private UserService uServ;
	
	@Autowired
	private UserValidator uValid;
	
	@GetMapping("/register")
	public String registerPage(@ModelAttribute("user")User emptyUser, Model viewModel) {
		return "register.jsp";
	}
	
	@GetMapping("/")
	public String loginPage(@ModelAttribute("user")User emptyUser, Model viewModel) {
		return "login.jsp";
	}
	
	@PostMapping("/register")
	public User processRegister(@Valid @RequestBody User user) {
		System.out.println(user);
		return uServ.registerUser(user);
	}

	@PostMapping("/login")
	public String processLogin(@RequestParam("email")String postEmail,@RequestParam("password")String postPassword,RedirectAttributes redirectAttributes,HttpSession session) {
//		IF EMAIL IS NOT FOUND OR IF PASSWORD DOES NOT MATCH
		if( !this.uServ.authenticateUser(postEmail, postPassword)) {
			redirectAttributes.addFlashAttribute("error", "INVALID CREDENTIALS");
			return "redirect:/";
		}
//		FIND USER FROM DB AND THEN SET USER ID IN SESSION
		User loggedUser = uServ.findByEmail(postEmail);
		session.setAttribute("user_id", loggedUser.getId());
		return "redirect:/main";
	}
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
}
