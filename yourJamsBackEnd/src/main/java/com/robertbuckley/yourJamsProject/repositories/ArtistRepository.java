package com.robertbuckley.yourJamsProject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.robertbuckley.yourJamsProject.models.Artist;

public interface ArtistRepository extends CrudRepository<Artist, Long> {
	List<Artist> findAll();
}
