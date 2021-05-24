package com.robertbuckley.yourJamsProject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.robertbuckley.yourJamsProject.models.Album;

public interface AlbumRepository extends CrudRepository<Album, Long>{
	List<Album> findAll();
}