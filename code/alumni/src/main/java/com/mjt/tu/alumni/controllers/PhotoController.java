package com.mjt.tu.alumni.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.mjt.tu.alumni.dtos.GroupPhoto;
import com.mjt.tu.alumni.dtos.PhotoDto;
import com.mjt.tu.alumni.services.PhotoService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/photos")
@AllArgsConstructor
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @PostMapping("/upload")
    private GroupPhoto createPhoto(@RequestParam("file") MultipartFile file, @RequestParam("token") String token,
            @RequestParam("group") long groupId) {
        return this.photoService.uploadPhoto(token, groupId, file);
    }

    @DeleteMapping("/removePhoto/{id}")
    private String deletePhoto(@PathVariable("id") String id) {
        return photoService.deletePhoto(id);
    }

    @GetMapping("/getTopPhotos")
    private Set<PhotoDto> getTopPhotos() {
        return photoService.getTopPhotos();
    }
}
