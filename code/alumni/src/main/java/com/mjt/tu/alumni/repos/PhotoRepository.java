package com.mjt.tu.alumni.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mjt.tu.alumni.models.Photo;

@Repository
public interface PhotoRepository extends CrudRepository<Photo, String> {

}
