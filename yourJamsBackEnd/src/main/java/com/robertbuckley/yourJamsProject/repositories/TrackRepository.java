package com.robertbuckley.yourJamsProject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.robertbuckley.yourJamsProject.models.Track;

public interface TrackRepository extends CrudRepository<Track, Long>{
	List<Track> findAll();
	Track findByTrackName(String trackName);
	boolean existsByTrackName(String trackName);
}
