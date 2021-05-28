package com.robertbuckley.yourJamsProject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.robertbuckley.yourJamsProject.models.Artist;
import com.robertbuckley.yourJamsProject.models.User;

public interface ArtistRepository extends CrudRepository<Artist, Long> {
	List<Artist> findAll();
	Artist findByArtistId(Long artistId);
	boolean existsByArtistId(Long artistId);
}
