package com.robertbuckley.yourJamsProject.models;

import java.util.Date;
import java.util.List;

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
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="posts")
public class Post {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
//	@NotBlank
	private String content;
//	@NotBlank
	private String artistName;
	@Column(updatable=false)
	private Date createdAt;
	private Date updatedAt;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "artist_post",
			joinColumns = @JoinColumn(name="post_id"),
			inverseJoinColumns = @JoinColumn(name="artist_id")
			)
	private List<Artist> postArtists;
	
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="artist_id")
//	private Artist artist;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getArtistName() {
		return artistName;
	}

	public void setArtistName(String artistName) {
		this.artistName = artistName;
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
	

	@JsonBackReference(value="user-movement")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Artist> getPostArtists() {
		return postArtists;
	}

	public void setPostArtists(List<Artist> postArtists) {
		this.postArtists = postArtists;
	}

}
