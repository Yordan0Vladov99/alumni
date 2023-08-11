package com.mjt.tu.alumni.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mjt.tu.alumni.models.Group;

public interface GroupRepository extends CrudRepository<Group, Long> {
    List<Group> findTop10ByOrderByMembers();

    List<Group> findAllBySelected(Boolean selected);
}
