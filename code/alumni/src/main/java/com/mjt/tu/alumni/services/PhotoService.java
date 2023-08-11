package com.mjt.tu.alumni.services;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mjt.tu.alumni.dtos.GroupPhoto;
import com.mjt.tu.alumni.dtos.PhotoDto;
import com.mjt.tu.alumni.models.Group;
import com.mjt.tu.alumni.models.Photo;
import com.mjt.tu.alumni.models.User;
import com.mjt.tu.alumni.repos.GroupRepository;
import com.mjt.tu.alumni.repos.PhotoRepository;
import com.mjt.tu.alumni.repos.UserRepository;
import com.mjt.tu.alumni.security.config.JwtService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FilesStorageService storageService;
    @Autowired
    private JwtService jwtService;

    public GroupPhoto uploadPhoto(String token, long groupId, MultipartFile file) {

        String userId = jwtService.extractUsername(token);
        User user = userRepository.findById(userId).orElseThrow();
        Photo photo = new Photo();
        photo.setCreated(LocalDateTime.now());
        photo.setUser(user);
        if (groupId != -1) {
            Group group = groupRepository.findById(groupId).orElseThrow();
            photo.setGroup(group);
        }
        Optional<String> extension = Optional.ofNullable(file.getOriginalFilename())
                .filter(f -> f.contains("."))
                .map(f -> f.substring(file.getOriginalFilename().lastIndexOf(".") + 1));
        photo.setFileExtension(extension.get());
        userRepository.save(user);
        photo = photoRepository.save(photo);

        storageService.save(file, photo.getFileName(), extension.get());
        return new GroupPhoto(photo.getFileName(), photo.getPath(), false);

    }

    public Photo getPhoto(String id) {
        return photoRepository.findById(id).get();
    }

    public String deletePhoto(String id) {
        if (photoRepository.existsById(id)) {
            return "No such photo.";
        }

        photoRepository.delete(photoRepository.findById(id).get());
        return "Deleted";
    }

    public Set<PhotoDto> getTopPhotos() {
        Group topGroup = groupRepository.findById(0l).get();
        return new HashSet<>(topGroup.getPhotos().stream().map(photo -> {
            return new PhotoDto(photo.getFileName(), photo.getFileExtension(), photo.getUser().getName(),
                    photo.getCreated());
        }).toList());
    }
}
