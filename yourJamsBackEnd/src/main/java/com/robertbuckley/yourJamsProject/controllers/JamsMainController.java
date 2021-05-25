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
import com.robertbuckley.yourJamsProject.repositories.ArtistRepository;
import com.robertbuckley.yourJamsProject.services.JamsServices;
import com.robertbuckley.yourJamsProject.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JamsMainController {
	@Autowired
	private UserService uServ;
	
	@Autowired
	private JamsServices jServ;
	
	@Autowired
	private ArtistRepository aRepo;
	
//	@PostMapping("/addArtist/{id}")
//	public Long createArtist(@Valid @PathVariable("id")Long id, @ModelAttribute("artId")Artist artist) {
//		if(id == artist.getArtistId()) {
//			return null;
//		} else {
//			this.jServ.createArtist(artist);
//		}
//		return null;
//	}
	
	@PostMapping("/likeArtist/{userId}/{artistId}")
	public Long likeArtist(@PathVariable("userId")Long userId, @PathVariable("artistId")Long artistId, @ModelAttribute("artist")Artist artist) {
//		User currentUser = this.uServ.findByEmail(user.getEmail());
		System.out.println("current user " + userId);
		System.out.println("current artist " + artistId);
//		System.out.println("current user" + user.getId());
		User currentUser = this.uServ.findUserById(userId);
//		System.out.println(userId);
//		Long artistId = currentArtist.getArtistId();
//		System.out.println(this.jServ.findByArtistId(artistId).getArtistId());
//		Long currentArtist = this.jServ.findArtistById(artist.getArtistId());
		if(this.jServ.findByArtistId(artistId) == null) {
//			artist.setArtistId(artistId);
			Artist thisArtist = this.jServ.createArtist(artist);
//			Artist thisArtist = this.jServ.findByArtistId(artist.getArtistId());
//			System.out.println("findByArtistId" + thisArtist.getArtistId());
//			System.out.println("hit the null statement created artist" + artist.getArtistId());
//			System.out.println(currentUser.getId());
//			jServ.likeArtist(currentUser, thisArtist);
			if(currentUser.getArtists().contains(artist)) {
				return null;
			} else {
				jServ.likeArtist(currentUser, thisArtist);
			}
		} else if(currentUser.getArtists().contains(artist)){
			System.out.println(currentUser.getArtists());
			System.out.println(" hit the else statement " + artist);
		} else {
			Artist thisArtist = this.jServ.findByArtistId(artistId);
			jServ.likeArtist(currentUser, thisArtist);
//			jServ.likeArtist(currentUser, artist);
			System.out.println(" hit the else if statement " + artist.getArtistId());
			return null;
		}
		return null;
	}
}


		
//	}
//		String userEmail = user.getEmail();
//		System.out.println(userEmail);
//		User currentUser = this.uServ.findByEmail(userEmail);
//		System.out.println(currentUser);
//		Artist currentArtist = this.jServ.findArtistById(id);
//		this.jServ.likeArtist(currentUser, currentArtist);
