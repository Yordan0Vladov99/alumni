package com.mjt.tu.alumni.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mjt.tu.alumni.dtos.CartItemDto;
import com.mjt.tu.alumni.dtos.GroupLinkDto;
import com.mjt.tu.alumni.dtos.GroupMember;
import com.mjt.tu.alumni.dtos.GroupPhoto;
import com.mjt.tu.alumni.dtos.GroupRelative;
import com.mjt.tu.alumni.dtos.ItemRequestResponse;
import com.mjt.tu.alumni.dtos.PhotoSessionResponse;
import com.mjt.tu.alumni.dtos.ProfileChangeDto;
import com.mjt.tu.alumni.dtos.UserDto;
import com.mjt.tu.alumni.models.Photo;
import com.mjt.tu.alumni.models.User;
import com.mjt.tu.alumni.models.UserType;
import com.mjt.tu.alumni.repos.PhotoRepository;
import com.mjt.tu.alumni.repos.UserRepository;
import com.mjt.tu.alumni.security.auth.AuthenticationRequest;
import com.mjt.tu.alumni.security.auth.AuthenticationResponse;
import com.mjt.tu.alumni.security.auth.RegisterRequest;
import com.mjt.tu.alumni.security.auth.RegistrationResponse;
import com.mjt.tu.alumni.security.auth.UpdateRequest;
import com.mjt.tu.alumni.security.auth.UserInfoRequest;
import com.mjt.tu.alumni.security.config.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
        @Autowired
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final PhotoRepository photoRepository;

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getId(), request.getPassword()));
                var user = userRepository.findById(request.getId()).orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .userType(user.getType())
                                .profile(user.getProfilePicture() != null ? user.getProfilePicture().getPath()
                                                : "undefined")
                                .build();

        }

        public RegistrationResponse register(RegisterRequest request) {
                var user = User.builder()
                                .id(request.getId())
                                .name(request.getName())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .type(UserType.ROLE_USER).build();
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return RegistrationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse updateAdmin(RegisterRequest request) {
                var user = userRepository.findById(request.getId()).orElseThrow();
                user.setName(request.getName());
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();

        }

        public AuthenticationResponse update(UpdateRequest request) {
                String email = jwtService.extractUsername(request.getToken());

                var user = userRepository.findById(email).orElseThrow();
                user.setName(request.getName());
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();

        }

        public boolean userExists(String id) {
                return userRepository.existsById(id);
        }

        public User getUser(String id) {
                return userRepository.findById(id).get();
        }

        public String setUserProfile(ProfileChangeDto request) {
                String id = jwtService.extractUsername(request.token);
                User user = userRepository.findById(id).orElseThrow();
                Photo photo = photoRepository.findById(request.photo).get();
                user.setProfilePicture(photo);
                userRepository.save(user);

                return "Changed profile";
        }

        public Set<GroupLinkDto> getUserGroups(String id) {
                User user = userRepository.findById(id).orElseThrow();
                return Set.copyOf(
                                user.getGroups().stream()
                                                .map(group -> new GroupLinkDto(group.getId(), group.getName(),
                                                                group.getProfilePicture().getPath()))
                                                .toList());
        }

        public Set<ItemRequestResponse> getSentItemRequests(String token) {
                String id = jwtService.extractUsername(token);
                User user = userRepository.findById(id).orElseThrow();
                return Set.copyOf(user.getSentItemRequests().stream()
                                .map(request -> {
                                        CartItemDto cid = new CartItemDto(request.getPhoto().getPath(),
                                                        request.getType(), request.getPrice(), request.getQty(),
                                                        request.getColor());
                                        return new ItemRequestResponse(request.getId(), request.getStatus(),
                                                        request.isRead(),
                                                        request.getCreated(), cid);
                                })
                                .toList());
        }

        public Set<ItemRequestResponse> getReceivedItemRequests(String token) {
                String id = jwtService.extractUsername(token);
                User user = userRepository.findById(id).orElseThrow();
                return Set.copyOf(user.getReceivedItemRequests().stream()
                                .map(request -> {
                                        CartItemDto cid = new CartItemDto(request.getPhoto().getPath(),
                                                        request.getType(), request.getPrice(), request.getQty(),
                                                        request.getColor());
                                        return new ItemRequestResponse(request.getId(), request.getStatus(),
                                                        request.isRead(),
                                                        request.getCreated(), cid);
                                })
                                .toList());
        }

        public Set<PhotoSessionResponse> getSentSessions(String token) {
                String id = jwtService.extractUsername(token);
                User user = userRepository.findById(id).orElseThrow();
                return Set.copyOf(user.getReceivedSessionRequests().stream()
                                .map(session -> new PhotoSessionResponse(session.getId(), session.getPeople(),
                                                session.getSessionDate(), session.getLocation(),
                                                session.getStatus()))
                                .toList());
        }

        public Set<PhotoSessionResponse> getReceivedSessions(String token) {
                String id = jwtService.extractUsername(token);
                User user = userRepository.findById(id).orElseThrow();
                return Set.copyOf(user.getReceivedSessionRequests().stream()
                                .map(session -> new PhotoSessionResponse(session.getId(), session.getPeople(),
                                                session.getSessionDate(), session.getLocation(),
                                                session.getStatus()))
                                .toList());
        }

        public String deleteUser(String id) {
                userRepository.delete(userRepository.findById(id).orElseThrow());
                return "Deleted";
        }

        public RegistrationResponse registerAdmin(RegisterRequest request) {
                var user = User.builder()
                                .id(request.getId())
                                .name(request.getName())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .type(UserType.valueOf(request.getType())).build();
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return RegistrationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public UserDto getUser(UserInfoRequest request) {
                Set<Photo> likedPhotos;
                User user = userRepository.findById(request.email).get();

                if (request.token == null) {
                        likedPhotos = new HashSet<>();
                } else {
                        String email = jwtService.extractUsername(request.token);
                        User requester = userRepository.findById(email).get();
                        likedPhotos = requester.getLikedPhotos();
                }

                Set<GroupPhoto> photos = new HashSet<GroupPhoto>(
                                user.getPhotos().stream()
                                                .map(photo -> GroupPhoto.builder().id(photo.getFileName())
                                                                .src(photo.getPath())
                                                                .liked(likedPhotos.contains(photo)).build())
                                                .toList());
                Set<GroupRelative> groups = new HashSet<GroupRelative>(user.getGroups().stream().map(g -> {
                        return GroupRelative.builder()
                                        .id(g.getId())
                                        .imgSrc(g.getProfilePicture() == null ? null : g.getProfilePicture().getPath())
                                        .name(g.getName()).build();

                }).toList());

                return UserDto.builder().name(user.getName())
                                .email(user.getUsername()).profile(user.getProfilePicture() == null ? null
                                                : user.getProfilePicture().getPath())
                                .photos(photos).groups(groups).build();
        }

        public Set<GroupMember> findUsers(String name) {
                Set<User> foundUsers = userRepository.findByNameContainsIgnoreCase(name);
                foundUsers.addAll(userRepository.findByIdContainsIgnoreCase(name));
                return new HashSet<GroupMember>(foundUsers.stream().map((user) -> {
                        Photo profile = user.getProfilePicture();
                        return GroupMember.builder().id(user.getId())
                                        .imgSrc(profile != null ? profile.getPath() : "undefined").name(user.getName())
                                        .build();
                }).toList());
        }

}
