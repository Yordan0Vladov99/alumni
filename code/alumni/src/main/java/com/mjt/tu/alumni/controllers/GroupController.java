package com.mjt.tu.alumni.controllers;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mjt.tu.alumni.dtos.GroupDto;
import com.mjt.tu.alumni.dtos.GroupLinkDto;
import com.mjt.tu.alumni.dtos.GroupPathDto;
import com.mjt.tu.alumni.dtos.PhotoDto;
import com.mjt.tu.alumni.models.Group;
import com.mjt.tu.alumni.repos.GroupRepository;
import com.mjt.tu.alumni.security.auth.GroupInfoRequest;
import com.mjt.tu.alumni.security.auth.GroupProfileRequest;
import com.mjt.tu.alumni.security.auth.GroupRequest;
import com.mjt.tu.alumni.security.auth.SelectGroupRequest;
import com.mjt.tu.alumni.services.GroupService;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;

    public GroupController(GroupRepository groupRepository, GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/create")
    private long createGroup(@RequestBody GroupRequest group) {
        return this.groupService.registerGroup(group);

    }

    @PostMapping("/changeProfile")
    private void changeProfile(@RequestBody GroupProfileRequest req) {
        this.groupService.changeProfile(req);
    }

    @PutMapping("/update")
    private String updateGroup(@RequestBody Group group) {
        return groupService.updateGroup(group);
    }

    @GetMapping
    private Set<GroupLinkDto> getTopGroups() {
        return groupService.getTopGroups();
    }

    @GetMapping("/get/{id}")
    private Group getGroup(@PathVariable("id") long id) {
        return groupService.getGroup(id);
    }

    @PostMapping("/getGroup")
    private GroupDto getGroup(@RequestBody GroupInfoRequest req) {
        return groupService.getGroup(req);
    }

    @GetMapping("/get/{id}/photos")
    private Set<PhotoDto> getGroupPhotos(@PathVariable("id") long id) {
        return groupService.getGroupPhotos(id);
    }

    @GetMapping("/get/{id}/path")
    private List<GroupPathDto> getPath(@PathVariable("id") long id) {
        return groupService.getPath(id);
    }

    @GetMapping("/getSelectedGroups")
    private List<GroupLinkDto> getSelected() {
        return groupService.getSelected();
    }

    @GetMapping("/get/{id}/children")
    private Set<GroupLinkDto> getChildren(@PathVariable("id") long id) {
        return groupService.getGroupChildren(id);
    }

    @PutMapping("{id}/addMember/{memberId}")
    private String addMember(@PathVariable("id") long groupId, @PathVariable("memberId") String memId) {
        return this.groupService.addMember(groupId, memId);
    }

    @PostMapping("/select")
    private String selectGroup(@RequestBody SelectGroupRequest req) {
        return groupService.selectGroup(req);
    }

}
