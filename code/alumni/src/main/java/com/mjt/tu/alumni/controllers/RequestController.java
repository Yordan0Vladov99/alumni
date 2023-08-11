package com.mjt.tu.alumni.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mjt.tu.alumni.dtos.GetItemRequestDto;
import com.mjt.tu.alumni.dtos.ItemRequestDto;
import com.mjt.tu.alumni.dtos.PhotoSessionRequest;
import com.mjt.tu.alumni.dtos.ShareRequest;
import com.mjt.tu.alumni.dtos.UpdateItemRequest;
import com.mjt.tu.alumni.models.ItemRequest;
import com.mjt.tu.alumni.models.Photo;
import com.mjt.tu.alumni.models.PhotoSession;
import com.mjt.tu.alumni.models.Status;
import com.mjt.tu.alumni.models.User;
import com.mjt.tu.alumni.repos.ItemRequestRepository;
import com.mjt.tu.alumni.repos.PhotoRepository;
import com.mjt.tu.alumni.repos.PhotoSessionRepository;
import com.mjt.tu.alumni.repos.UserRepository;
import com.mjt.tu.alumni.security.config.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {
    @Autowired
    private final ItemRequestRepository itemRequestRepository;
    private final PhotoSessionRepository photoSessionRepository;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @PostMapping("/item/create")
    private void createItemRequest(@RequestBody ItemRequestDto request) {
        User user = userRepository.findById(request.user).orElseThrow();
        User receiver = userRepository.findById("admin@admin.bg").orElseThrow();
        Photo photo = photoRepository.findById(request.img).orElseThrow();

        ItemRequest itemReq = new ItemRequest(Status.Pending, user, receiver, photo, request.type, request.color, false,
                request.qty, request.price);
        user.addSentItemRequest(itemReq);
        receiver.addReceivedItemRequest(itemReq);
        this.userRepository.save(user);
        this.userRepository.save(receiver);
        this.itemRequestRepository.save(itemReq);
    }

    @PostMapping("/item/read")
    private void readRequest(@RequestBody GetItemRequestDto request) {
        String id = jwtService.extractUsername(request.token);
        User user = userRepository.findById(id).get();
        ItemRequest userReq = itemRequestRepository.findById(request.requestId).get();

        if (user.getReceivedItemRequests().contains(userReq)) {
            userReq.setRead(true);
            itemRequestRepository.save(userReq);
        }
    }

    @PostMapping("/item/share")
    private void sharePhoto(@RequestBody ShareRequest request) {
        String id = jwtService.extractUsername(request.token);
        User user = userRepository.findById(id).get();
        Photo photo = photoRepository.findById(request.img).get();
        userRepository.findAllById(request.receivers).forEach((receiver) -> {
            ItemRequest req = new ItemRequest(Status.Pending, user, receiver, photo, "share", null, false, 0, 0);
            itemRequestRepository.save(req);
        });

    }

    @PostMapping("/item/change")
    private String updateItemRequest(@RequestBody UpdateItemRequest request) {
        long id = request.id;
        String photographer = jwtService.extractUsername(request.token);

        if (!itemRequestRepository.existsById(id)) {
            return "No such request.";
        }

        ItemRequest existingReq = itemRequestRepository.findById(id).orElseThrow();
        if (!existingReq.getReceiver().getId().equals(photographer)) {
            return "Wrong photographer";
        }
        String status = request.status;
        if (status.equals("accept")) {
            existingReq.setStatus(Status.Accepted);
        } else if (status.equals("deny")) {
            existingReq.setStatus(Status.Denied);
        }
        itemRequestRepository.save(existingReq);
        return "Updated.";
    }

    @DeleteMapping("/item/{id}")
    private String deleteItemRequest(@PathVariable("id") long id) {
        if (!itemRequestRepository.existsById(id)) {
            return "No such request.";
        }

        itemRequestRepository.delete(itemRequestRepository.findById(id).get());
        return "Deleted.";
    }

    @PostMapping("/session/create")
    private void createPhotoSession(@RequestBody PhotoSessionRequest request) {
        User sender = userRepository.findById(request.sender).orElseThrow();
        User receiver = userRepository.findById("yordan_vladov@abv.bg").orElseThrow();

        String str = request.date + " " + request.time;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

        PhotoSession session = new PhotoSession(request.description, Status.Pending, sender, request.people, dateTime,
                request.location, receiver);
        sender.addSentSessionRequest(session);
        receiver.addReceivedSessionRequest(session);

        photoSessionRepository.save(session);
        userRepository.save(sender);
        userRepository.save(receiver);

    }

    @GetMapping("/session/{id}")
    private PhotoSession getPhotoSession(@PathVariable("id") long id) {
        return photoSessionRepository.findById(id).get();
    }

    @PutMapping("/session/{id}")
    private String updatePhotoSession(@RequestBody PhotoSession request) {
        if (!photoSessionRepository.existsById(request.getId())) {
            return "No such request.";
        }

        PhotoSession existingReq = photoSessionRepository.findById(request.getId()).get();
        existingReq.setStatus(request.getStatus());
        return "Updated.";
    }

    @DeleteMapping("/session/{id}")
    private String deletePhotoSession(@PathVariable("id") long id) {
        if (!photoSessionRepository.existsById(id)) {
            return "No such request.";
        }

        photoSessionRepository.delete(photoSessionRepository.findById(id).get());
        return "Deleted.";
    }

}
