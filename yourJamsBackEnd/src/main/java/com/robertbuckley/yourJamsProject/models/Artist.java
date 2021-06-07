package com.robertbuckley.yourJamsProject.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="artists")

public class Artist{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
//	@NotBlank
	private Long artistId;
	private String artistName;
	private String urlArt;
	@Column(updatable=false)
	private Date createdAt;
	private Date updatedAt;
	
	@JsonBackReference
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "artist_user",
			joinColumns = @JoinColumn(name="artist_id"),
			inverseJoinColumns = @JoinColumn(name="user_id")
			)
	private List<User> artistLiked;
	
//	@JsonBackReference
	@JsonBackReference(value="artist")
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "artist_post",
			joinColumns = @JoinColumn(name="artist_id"),
			inverseJoinColumns = @JoinColumn(name="post_id")
			)
	private List<Post> artistPost;
//	@JsonIgnore
//	@JsonManagedReference(value="artist-movement")
//	@OneToMany(mappedBy="artist", fetch=FetchType.LAZY)
//	private List<Post> artistPosts;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	
	public Artist() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getArtistName() {
		return artistName;
	}

	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}

	public String getUrlArt() {
		return urlArt;
	}

	public void setUrlArt(String urlArt) {
		this.urlArt = urlArt;
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

	public Long getArtistId() {
		return artistId;
	}

	public void setArtistId(Long artistId) {
		this.artistId = artistId;
	}
	
	public List<User> getArtistLiked() {
		return artistLiked;
	}

	public void setArtistLiked(List<User> artistLiked) {
		this.artistLiked = artistLiked;
	}

	public List<Post> getArtistPost() {
		return artistPost;
	}

	public void setArtistPost(List<Post> artistPost) {
		this.artistPost = artistPost;
	}
	
}
