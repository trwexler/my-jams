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

@Entity
@Table(name="albums")
public class Album {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	private Long albumId;
	@Column(updatable=false)
	private Date createdAt;
	private Date updatedAt;
	
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="artist_id")
//	private Artist artist;
//	
//	@OneToMany(mappedBy="albums", fetch=FetchType.LAZY)
//	private List<Track> tracks;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "album_user",
			joinColumns = @JoinColumn(name="album_id"),
			inverseJoinColumns = @JoinColumn(name="user_id")
			)
	
	private List<User> albumLiked;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

	public Album() {
		
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getAlbumId() {
		return albumId;
	}

	public void setAlbumId(Long albumId) {
		this.albumId = albumId;
	}
	
	@JsonBackReference
	public List<User> getAlbumLiked() {
		return albumLiked;
	}

	public void setAlbumLiked(List<User> albumLiked) {
		this.albumLiked = albumLiked;
	}
	
}
