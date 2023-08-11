package com.mjt.tu.alumni.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mjt.tu.alumni.models.Group;
import com.mjt.tu.alumni.models.Photo;
import com.mjt.tu.alumni.security.auth.AuthenticationResponse;
import com.mjt.tu.alumni.security.auth.RegisterRequest;
import com.mjt.tu.alumni.security.auth.RegistrationResponse;
import com.mjt.tu.alumni.services.GroupService;
import com.mjt.tu.alumni.services.PhotoService;
import com.mjt.tu.alumni.services.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private PhotoService photoService;

    @PostMapping("/users/register")
    public ResponseEntity<RegistrationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerAdmin(request));
    }

    @GetMapping("/photos/get/{id}")
    private Photo getPhoto(@PathVariable("id") String id) {

        return photoService.getPhoto(id);
    }

    @GetMapping("/groups/{id}")
    private Group getGroup(@PathVariable("id") long id) {

        return groupService.getGroup(id);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @PutMapping("/users/update")
    public ResponseEntity<AuthenticationResponse> update(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.updateAdmin(request));
    }

    @DeleteMapping("groups/removeGroup/{id}")
    private String deleteGroup(@PathVariable("id") long id) {
        return groupService.deleteGroup(id);
    }
}
