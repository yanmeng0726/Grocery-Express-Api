package com.springboot.grocery.repository;

import com.springboot.grocery.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String username);
    @Query(value = "SELECT * FROM user WHERE username = ?1 Or email = ?1", nativeQuery = true)
    Optional<User> findUser(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
