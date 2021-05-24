package com.robertbuckley.yourJamsProject.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.robertbuckley.yourJamsProject.models.Artist;
import com.robertbuckley.yourJamsProject.models.User;
import com.robertbuckley.yourJamsProject.services.JamsServices;
import com.robertbuckley.yourJamsProject.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JamsMainController {
	@Autowired
	private UserService uServ;
	
	@Autowired
	private JamsServices jServ;
	
	@PostMapping("/addArtist/{id}")
	public Long createArtist(@Valid @PathVariable("id")Long id, @ModelAttribute("artId")Artist artist) {
		if(id == artist.getArtistId()) {
			return null;
		} else {
			this.jServ.createArtist(artist);
		}
		return null;
	}
	
	@GetMapping("/likeArtist/{id}")
	public Long likeArtist(@PathVariable("id")Long id, @ModelAttribute("user")User user) {
		String userEmail = user.getEmail();
		System.out.println(userEmail);
		User currentUser = this.uServ.findByEmail(userEmail);
		System.out.println(currentUser);
		Artist currentArtist = this.jServ.findArtistById(id);
		this.jServ.likeArtist(currentUser, currentArtist);
		return null;
	}
}
