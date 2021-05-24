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
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="tracks")
public class Track {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	private Long trackId;
	@Column(updatable=false)
	private Date createdAt;
	private Date updatedAt;
	
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="album_id")
//	private Album albums;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name= "track_user",
			joinColumns = @JoinColumn(name="track_id"),
			inverseJoinColumns = @JoinColumn(name="user_id")
			)
	
	private List<User> trackLiked;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	
	public Track() {
		
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

	public Long getTrackId() {
		return trackId;
	}

	public void setTrackId(Long trackId) {
		this.trackId = trackId;
	}

	public List<User> getTrackLiked() {
		return trackLiked;
	}

	public void setTrackLiked(List<User> trackLiked) {
		this.trackLiked = trackLiked;
	}

}
