package com.robertbuckley.yourJamsProject.controllers;

import java.util.List;


import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.robertbuckley.yourJamsProject.models.Album;
import com.robertbuckley.yourJamsProject.models.Artist;

import com.robertbuckley.yourJamsProject.models.Post;

import com.robertbuckley.yourJamsProject.models.Track;
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
		System.out.println("current user " + userId);
		System.out.println("current artist " + artistId);
		User currentUser = this.uServ.findUserById(userId);
		List<Artist> getArtists = currentUser.getArtists();
		if(!this.jServ.doesArtistExist(artistId)) {
			System.out.println("hit the if statement");
			Artist thisArtist = this.jServ.createArtist(artist);
			System.out.println(thisArtist.getId());
		}  		
			if  (getArtists.contains(this.jServ.findByArtistId(artistId))){
				System.out.println(currentUser.getArtists());
				System.out.println(" hit the second if statement " + artist);
			} else {
				Artist thisArtist = this.jServ.findByArtistId(artistId);
				System.out.println(getArtists.contains(thisArtist));
				System.out.println("hit the else statement" + thisArtist);
				jServ.likeArtist(currentUser, thisArtist);
				System.out.println(" hit the else statement ");
				return null;

			}
		
		return null;
	}
	
	@PostMapping("/likeAlbum/{userId}/{albumId}")
	public Long likeAlbum(@PathVariable("userId")Long userId, @PathVariable("albumId")Long albumId, @ModelAttribute("album")Album album) {
		System.out.println("current user " + userId);
		System.out.println("current album " + albumId);
		User currentUser = this.uServ.findUserById(userId);
		List<Album> getAlbums = currentUser.getAlbum();
		if(!this.jServ.doesAlbumExist(albumId)) {
			System.out.println("hit the if statement");
			Album thisAlbum = this.jServ.createAlbum(album);
			System.out.println(thisAlbum.getId());
		}  		
			if  (getAlbums.contains(album)){
				System.out.println(currentUser.getAlbum());
				System.out.println(" hit the second if statement " + album);
			} else {
				Album thisAlbum = this.jServ.findByAlbumId(albumId);
				System.out.println("hit the else statement" + thisAlbum);
				jServ.likeAlbum(currentUser, thisAlbum);
				System.out.println(" hit the else statement ");
				return null;
			}
		
		return null;
	}
	
	@PostMapping("/likeTrack/{userId}/{trackName}")
	public Long likeTrack(@PathVariable("userId")Long userId, @PathVariable("trackName")String trackName, @ModelAttribute("track")Track track) {
		System.out.println("current user " + userId);
		System.out.println("current track " + trackName);
		User currentUser = this.uServ.findUserById(userId);
		List<Track> getTracks = currentUser.getTracks();
		if(!this.jServ.doesTrackExist(trackName)) {
			System.out.println("hit the if statement");
			Track thisTrack = this.jServ.createTrack(track);
			System.out.println(thisTrack.getId());
		}  		
			if  (getTracks.contains(track)){
				System.out.println(currentUser.getTracks());
				System.out.println(" hit the second if statement " + track);
			} else {
				Track thisTrack = this.jServ.findByTrackName(trackName);
				System.out.println("hit the else statement" + thisTrack);
				jServ.likeTrack(currentUser, thisTrack);
				System.out.println(" hit the else statement ");
				return null;
			}
		
		return null;
	}
	
	@PostMapping("/unLikeArtist/{userId}/{artistId}")
	public String unLikeArtist(@PathVariable("userId")Long userId, @PathVariable("artistId")Long artistId, @ModelAttribute("artist")Artist artist) {
		User currentUser = this.uServ.findUserById(userId);
		Artist currentArtist = this.jServ.findByArtistId(artistId);
		this.jServ.unLikeArtist(currentUser, currentArtist);
		return null;
	}
	
	@PostMapping("/unLikeAlbum/{userId}/{albumId}")
	public String unLikeArtist(@PathVariable("userId")Long userId, @PathVariable("albumId")Long albumId, @ModelAttribute("album")Album album) {
		User currentUser = this.uServ.findUserById(userId);
		Album currentAlbum = this.jServ.findByAlbumId(albumId);
		this.jServ.unLikeAlbum(currentUser, currentAlbum);
		return null;
	}
	
	@PostMapping("/unLikeTrack/{userId}/{trackName}")
	public String unLikeTrack(@PathVariable("userId")Long userId, @PathVariable("trackName")String trackName, @ModelAttribute("track")Track track) {
		User currentUser = this.uServ.findUserById(userId);
		Track currentTrack = this.jServ.findByTrackName(trackName);
		this.jServ.unLikeTrack(currentUser, currentTrack);
		return null;
	}
	
	@PostMapping("/addPost/{userId}")
	public Post addPost(@PathVariable("userId")Long userId, @ModelAttribute("post")Post post) {
		System.out.println(userId);
		return jServ.createPost(post);
	}
	
	@PostMapping("/deletePost/{userId}")
	public String deletePost(@PathVariable("id")Long id) {
		jServ.deletePost(id);
		return null;
	}
}

