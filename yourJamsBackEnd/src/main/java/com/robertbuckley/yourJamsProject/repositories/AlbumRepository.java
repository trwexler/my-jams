package com.robertbuckley.yourJamsProject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.robertbuckley.yourJamsProject.models.Album;
import com.robertbuckley.yourJamsProject.models.Artist;

public interface AlbumRepository extends CrudRepository<Album, Long>{
	List<Album> findAll();
	Album findByAlbumId(Long albumId);
	boolean existsByAlbumId(Long albumId);
}
