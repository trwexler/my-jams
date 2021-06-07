package com.robertbuckley.yourJamsProject.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
//	
//	@GetMapping("/register")
//	public String registerPage(@ModelAttribute("user")User emptyUser, Model viewModel) {
//		return "register.jsp";
//	}
	
//	@GetMapping("/")
//	public String loginPage(@ModelAttribute("user")User emptyUser, Model viewModel) {
//		return "login.jsp";
//	}
	
	@GetMapping("/getUser/{email}")
	public User loginPage(@PathVariable("email")String email) {
		System.out.println("From getmapping getuser/{email} " + email);
		User thisUser = uServ.findByEmail(email);
//		System.out.println(Artist thisUser.getArtists().getId());
//		User currentUser = uServ.findByEmail(email);
//		System.out.println(currentUser.getId());
		return uServ.findByEmail(email);
	}
	
	@PostMapping("/register")
	public User processRegister(@Valid @RequestBody User user) {
		System.out.println(user);
		return uServ.registerUser(user);
	}

	@PostMapping("/login")
	public boolean proccesslogin(@RequestBody User user) {
		System.out.println("in process login");
		System.out.println("user email" + user.getEmail());
		if( !this.uServ.authenticateUser(user.getEmail(), user.getPassword())) {
//			redirectAttributes.addFlashAttribute("error", "INVALID CREDENTIALS");
			System.out.println("null");
		}
		System.out.println(user.getEmail());
//		System.out.println(user.getPassword());
		String userEmail = user.getEmail();
		String userPassword = user.getPassword();
//		if(userEmail != user.getEmail()) {
//			System.out.println("false");
//		} else {
//			if(BCrypt.checkpw(userPassword, user.getPassword())) {
//                System.out.println("true");
//            } else {
//                System.out.println("false");
//            }
//		}
		return uServ.authenticateUser(userEmail, userPassword);
		
	}
//	
//	@PostMapping("/likeArtist/{id}")
//	public User likeArtist(@PathVariable("id")Long id) {
//		
//		return null;
//		
//	}
	
	
	
	
	
//	@PostMapping("/login")
//	public @Valid String processLogin(@Valid @RequestBody String user) {
////		User loggedUser = uServ.findByEmail(email);
//		System.out.println("comming from back end ");
////		String output = user;
////		User userEmail = uServ.findByEmail(email);
////		System.out.println("comming from back end " + userEmail);
//		
//		return user;
//	}
//	
	
	
	
//	@PostMapping("/login")
//	public String processLogin(@RequestParam("email")String postEmail,@RequestParam("password")String postPassword,RedirectAttributes redirectAttributes,HttpSession session) {
////		IF EMAIL IS NOT FOUND OR IF PASSWORD DOES NOT MATCH
//		if( !this.uServ.authenticateUser(postEmail, postPassword)) {
//			redirectAttributes.addFlashAttribute("error", "INVALID CREDENTIALS");
//			return "redirect:/";
//		}
////		FIND USER FROM DB AND THEN SET USER ID IN SESSION
//		User loggedUser = uServ.findByEmail(postEmail);
//		session.setAttribute("user_id", loggedUser.getId());
//		return "redirect:/main";
//	}
//	

	
	
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
}
