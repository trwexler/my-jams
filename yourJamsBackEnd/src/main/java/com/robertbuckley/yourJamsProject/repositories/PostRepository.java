package com.robertbuckley.yourJamsProject.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.robertbuckley.yourJamsProject.models.Post;

public interface PostRepository extends CrudRepository<Post, Long>{
	List<Post> findAll();
}
