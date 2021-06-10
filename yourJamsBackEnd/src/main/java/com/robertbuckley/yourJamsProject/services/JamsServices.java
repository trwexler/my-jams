package com.robertbuckley.yourJamsProject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.robertbuckley.yourJamsProject.models.Album;
import com.robertbuckley.yourJamsProject.models.Artist;
import com.robertbuckley.yourJamsProject.models.Post;
import com.robertbuckley.yourJamsProject.models.Track;
import com.robertbuckley.yourJamsProject.models.User;
import com.robertbuckley.yourJamsProject.repositories.AlbumRepository;
import com.robertbuckley.yourJamsProject.repositories.ArtistRepository;
import com.robertbuckley.yourJamsProject.repositories.PostRepository;
import com.robertbuckley.yourJamsProject.repositories.TrackRepository;
import com.robertbuckley.yourJamsProject.repositories.UserRepository;

@Service
public class JamsServices {
	@Autowired
	private AlbumRepository albumRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private ArtistRepository artistrepo;
	
	@Autowired
	private TrackRepository tRepo;
	
	@Autowired
	private PostRepository pRepo;
	
	public JamsServices(AlbumRepository albumRepo, UserRepository uRepo, ArtistRepository artistrepo, TrackRepository tRepo, PostRepository pRepo) {
		this.albumRepo = albumRepo;
		this.artistrepo = artistrepo;
		this.tRepo = tRepo;
		this.uRepo = uRepo;
	}
	
	public List<Artist> findAllArtists(){
		return this.artistrepo.findAll();
	}
	
	public List<Album> findAllAlbums(){
		return this.albumRepo.findAll();
	}
	
	public List<User> findAllUsers(){
		return this.uRepo.findAll();
	}
	
	public List<Track> findAllTracks(){
		return this.tRepo.findAll();
	}
	
	public List<Post> findAllPost(){
		return this.pRepo.findAll();
	}
	
	public User findUserById(Long id) {
		return this.uRepo.findById(id).orElse(null);
	}
	
	public Album findAlbumById(Long id) {
		return this.albumRepo.findById(id).orElse(null);
	}
	
	public Album findByAlbumId(Long albumId) {
		return this.albumRepo.findByAlbumId(albumId);
	}
	
	public boolean doesAlbumExist(Long albumId) {
		return this.albumRepo.existsByAlbumId(albumId);
	}
	
	public Artist findByArtistId(Long artistId) {
		return this.artistrepo.findByArtistId(artistId);
	}
	
	public boolean doesArtistExist(Long artistId) {
		return this.artistrepo.existsByArtistId(artistId);
	}
//	
	public Artist findArtistById(Long id) {
		return this.artistrepo.findById(id).orElse(null);
	}
	
	public Track findTrackById(Long id) {
		return this.tRepo.findById(id).orElse(null);
	}
	
	public Track findByTrackName(String trackName) {
		return this.tRepo.findByTrackName(trackName);
	}
	
	public boolean doesTrackExist(String trackName) {
		return this.tRepo.existsByTrackName(trackName);

	}
	
	public Album createAlbum(Album newAlbum) {
		return this.albumRepo.save(newAlbum);
	}
	
	public Artist createArtist(Artist newArtist) {
		return this.artistrepo.save(newArtist);
	}
	
	public Track createTrack(Track newTrack) {
		return this.tRepo.save(newTrack);
	}
	
	public void likeArtist(User user, Artist artist) {
		System.out.println(artist.getId());
		System.out.println(artist.getArtistId());
		System.out.println(artist.getArtistLiked());
		List<Artist> artistToLike = user.getArtists();
		System.out.println(artistToLike);
		artistToLike.add(artist);
		System.out.println(artistToLike);
		this.uRepo.save(user);
	}
	
	public void likeAlbum(User user, Album album) {
		List<Album> albumToLike = user.getAlbum();
		albumToLike.add(album);
		this.uRepo.save(user);
	}
	
	public void likeTrack(User user, Track track) {
		List<Track> trackToLike = user.getTracks();
		trackToLike.add(track);
		this.uRepo.save(user);

	}
	
	public void unLikeArtist(User user, Artist artist) {
		List<User> artistToLeave = artist.getArtistLiked();
		artistToLeave.remove(user);
		this.artistrepo.save(artist);
	}
	
	public void unLikeAlbum(User user, Album album) {
		List<User> albumToLeave = album.getAlbumLiked();
		albumToLeave.remove(user);
		this.albumRepo.save(album);
	}
	
	public void unLikeTrack(User user, Track track) {
		List<User> trackToLeave = track.getTrackLiked();
		trackToLeave.remove(user);
		this.tRepo.save(track);

	}
	
	public Post createPost(Post post) {
		return this.pRepo.save(post);
	}
	
	public void deletePost(Long id) {
		this.pRepo.deleteById(id);
	}
	
	public void postArtist(Post post, Artist artist) {
		List<Post> postToArtist = artist.getArtistPost();
		System.out.println(postToArtist);
		postToArtist.add(post);
		this.artistrepo.save(artist);
	}
	
	public void postCreator(Post post, User user) {
		List<Post> postCreator = user.getPosts();
		System.out.println(postCreator);
		postCreator.add(post);
		this.uRepo.save(user);
	}
	
//	public void updatePost(Long id, Post post, Long artistId) {
//		Artist currentArtist = this.artistrepo.findByArtistId(artistId);
//		System.out.println(currentArtist.getId());
//		User currentUser = this.uRepo.findById(id).orElse(null);
//		post.setPostArtists(currentArtist);
//		post.setUser(currentUser);
//	}

}