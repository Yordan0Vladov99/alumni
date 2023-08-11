package com.mjt.tu.alumni.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mjt.tu.alumni.dtos.GroupLinkDto;
import com.mjt.tu.alumni.dtos.GroupMember;
import com.mjt.tu.alumni.dtos.ItemRequestResponse;
import com.mjt.tu.alumni.dtos.PhotoSessionResponse;
import com.mjt.tu.alumni.dtos.ProfileChangeDto;
import com.mjt.tu.alumni.dtos.UserDto;
import com.mjt.tu.alumni.models.User;
import com.mjt.tu.alumni.security.auth.AuthenticationRequest;
import com.mjt.tu.alumni.security.auth.AuthenticationResponse;
import com.mjt.tu.alumni.security.auth.RegisterRequest;
import com.mjt.tu.alumni.security.auth.RegistrationResponse;
import com.mjt.tu.alumni.security.auth.UpdateRequest;
import com.mjt.tu.alumni.security.auth.UserInfoRequest;
import com.mjt.tu.alumni.security.config.JwtService;
import com.mjt.tu.alumni.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authencticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PostMapping("/changeProfile")
    public ResponseEntity<String> updateProfile(@RequestBody ProfileChangeDto request) {
        return ResponseEntity.ok(userService.setUserProfile(request));
    }

    @PutMapping("/update")
    public ResponseEntity<AuthenticationResponse> update(
            @RequestBody UpdateRequest request) {
        return ResponseEntity.ok(userService.update(request));

    }

    @PostMapping("/getUser")
    public ResponseEntity<UserDto> getUser(@RequestBody UserInfoRequest request) {
        if (!userService.userExists(request.email)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getUser(request));
    }

    @PostMapping("/findUsers")
    public ResponseEntity<Set<GroupMember>> findUsers(@RequestBody String name) {
        return ResponseEntity.ok(userService.findUsers(name));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") String id) {
        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("/get/{id}/groups")
    public ResponseEntity<Set<GroupLinkDto>> getUserGroups(@PathVariable("id") String id) {
        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getUserGroups(id));
    }

    @PostMapping("/sentItemRequests")
    public ResponseEntity<Set<ItemRequestResponse>> getSentItemRequests(@RequestBody String token) {
        String id = jwtService.extractUsername(token);
        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getSentItemRequests(id));
    }

    @PostMapping("/receivedItemRequests")
    public ResponseEntity<Set<ItemRequestResponse>> getReceivedItemRequests(@RequestBody String token) {
        String id = jwtService.extractUsername(token);

        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getReceivedItemRequests(id));
    }

    @PostMapping("/sentSessionRequests")
    public ResponseEntity<Set<PhotoSessionResponse>> getSentSessionRequests(@RequestBody String token) {
        String id = jwtService.extractUsername(token);

        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getReceivedSessions(id));
    }

    @GetMapping("/receivedSessionRequests")
    public ResponseEntity<Set<PhotoSessionResponse>> getReceivedSessionRequests(@RequestBody String token) {
        String id = jwtService.extractUsername(token);

        if (!userService.userExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userService.getReceivedSessions(id));
    }

}
