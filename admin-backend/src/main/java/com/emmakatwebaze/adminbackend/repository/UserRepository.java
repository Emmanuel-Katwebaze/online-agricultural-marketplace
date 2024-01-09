package com.emmakatwebaze.adminbackend.repository;

import com.emmakatwebaze.adminbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
}
