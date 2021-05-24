package com.robertbuckley.yourJamsProject.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="users")
@EntityListeners(AuditingEntityListener.class)
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	@NotBlank
	@Column(name = "first_name", nullable = false)
	private String firstName;
	@NotBlank
	@Column(name = "last_name", nullable = false)
	private String lastName;
	@NotBlank
	@Column(name = "username", nullable = false)
	private String userName;
	@Email(message="Email must be valid")
	@NotBlank
	@Column(name = "email", nullable = false)
	private String email;	
	@Size(min=8, message="Password must be greater than 8 characters")
	@Column(name = "password", nullable = false)
	private String password;
	@Transient
	@Column(name = "password_confirmation", nullable = false)
	private String passwordConfirmation;
	@Column(updatable=false)
	private Date createdAt;
	private Date updatedAt;


	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "artist_user",
			joinColumns = @JoinColumn(name="user_id"),
			inverseJoinColumns = @JoinColumn(name="artist_id")
			)
	
	private List<Artist> artists;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "album_user",
			joinColumns = @JoinColumn(name="user_id"),
			inverseJoinColumns = @JoinColumn(name="album_id")
			)
	
	private List<Album> album;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "track_user",
			joinColumns = @JoinColumn(name="user_id"),
			inverseJoinColumns = @JoinColumn(name="track_id")
			)
	
	private List<Track> tracks;
	
	@OneToMany(mappedBy="user", fetch=FetchType.LAZY)
	private List<Post> posts;

		@PrePersist
		protected void onCreate() {
			this.createdAt = new Date();
		}
		
		@PreUpdate
		protected void onUpdate() {
			this.updatedAt = new Date();
		}
		
		public User(){
			
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;

		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getPasswordConfirmation() {
			return passwordConfirmation;
		}

		public void setPasswordConfirmation(String passwordConfirmation) {
			this.passwordConfirmation = passwordConfirmation;
		}

		public Date getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}

		public Date getUpdatedAt() {
			return updatedAt;
		}

		public void setUpdatedAt(Date updatedAt) {
			this.updatedAt = updatedAt;
		}


		public List<Artist> getArtists() {
			return artists;
		}

		public void setArtists(List<Artist> artists) {
			this.artists = artists;
		}

		public List<Post> getPosts() {
			return posts;
		}

		public void setPosts(List<Post> posts) {
			this.posts = posts;
		}

		public List<Album> getAlbum() {
			return album;
		}

		public void setAlbum(List<Album> album) {
			this.album = album;
		}

		public List<Track> getTracks() {
			return tracks;
		}

		public void setTracks(List<Track> tracks) {
			this.tracks = tracks;
		}

}
