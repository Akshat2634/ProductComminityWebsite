package com.nagarro.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.entity.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, String> {

}
