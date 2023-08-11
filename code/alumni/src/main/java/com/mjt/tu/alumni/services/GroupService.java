package com.mjt.tu.alumni.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mjt.tu.alumni.dtos.GroupDto;
import com.mjt.tu.alumni.dtos.GroupLinkDto;
import com.mjt.tu.alumni.dtos.GroupMember;
import com.mjt.tu.alumni.dtos.GroupPathDto;
import com.mjt.tu.alumni.dtos.GroupPhoto;
import com.mjt.tu.alumni.dtos.GroupRelative;
import com.mjt.tu.alumni.dtos.PhotoDto;
import com.mjt.tu.alumni.models.Group;
import com.mjt.tu.alumni.models.Photo;
import com.mjt.tu.alumni.models.User;
import com.mjt.tu.alumni.repos.GroupRepository;
import com.mjt.tu.alumni.repos.PhotoRepository;
import com.mjt.tu.alumni.repos.UserRepository;
import com.mjt.tu.alumni.security.auth.GroupInfoRequest;
import com.mjt.tu.alumni.security.auth.GroupProfileRequest;
import com.mjt.tu.alumni.security.auth.GroupRequest;
import com.mjt.tu.alumni.security.auth.SelectGroupRequest;
import com.mjt.tu.alumni.security.config.JwtService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private JwtService jwtService;

    public long registerGroup(GroupRequest groupRequest) {
        Group group = new Group();
        group.setName(groupRequest.getGroup());
        if (groupRequest.getParent() != -1) {
            Group parent = groupRepository.findById(groupRequest.getParent()).orElseThrow();
            group.setParent(parent);
        }
        long id = groupRepository.save(group).getId();
        addMember(id, groupRequest.getUser());

        return id;
    }

    public boolean groupExists(Group group) {
        return groupRepository.existsById(group.getId());
    }

    public String updateGroup(Group group) {
        if (!groupExists(group)) {
            return "No such group.";
        }
        Group existingGroup = groupRepository.findById(group.getId()).get();
        existingGroup.setName(group.getName());
        groupRepository.save(existingGroup);
        return "Updated.";
    }

    public Set<GroupLinkDto> getTopGroups() {
        return Set.copyOf(groupRepository.findTop10ByOrderByMembers().stream()
                .map(group -> new GroupLinkDto(group.getId(), group.getName(), group.getProfilePicture().getPath()))
                .toList());
    }

    public String addMember(long groupId, String memberId) {
        User user = userRepository.findById(memberId).orElseThrow();
        Group group = groupRepository.findById(groupId).orElseThrow();
        group.addMember(user);
        // System.out.println("\n".repeat(10) + group + "\n".repeat(10));
        groupRepository.save(group);

        user.addGroup(group);
        userRepository.save(user);

        return "Added";
    }

    public Group getGroup(long id) {
        Group group = groupRepository.findById(id).orElseThrow();
        return group;
    }

    public Group getGroupParent(long id) {
        Group group = groupRepository.findById(id).get();
        return group.getParent();
    }

    public Set<GroupLinkDto> getGroupChildren(long id) {
        Group group = groupRepository.findById(id).orElseThrow();
        return Set.copyOf(
                group.getChildren().stream().map(
                        child -> new GroupLinkDto(child.getId(), child.getName(), child.getProfilePicture().getPath()))
                        .toList());
    }

    public Set<PhotoDto> getGroupPhotos(long id) {
        Group group = groupRepository.findById(id).get();
        return Set.copyOf(group.getPhotos().stream()
                .map(photo -> new PhotoDto(photo.getFileName(), photo.getFileExtension(), photo.getUser().getId(),
                        photo.getCreated()))
                .toList());
    }

    public List<GroupPathDto> getPath(long id) {
        List<GroupPathDto> path = new ArrayList<>();
        Group group = groupRepository.findById(id).orElseThrow();
        path.add(new GroupPathDto(group.getId(), group.getName()));
        while (group.getParent() != null) {
            group = group.getParent();
            path.add(new GroupPathDto(group.getId(), group.getName()));
        }
        Collections.reverse(path);
        return path;
    }

    public String deleteGroup(long id) {
        if (!groupRepository.existsById(id)) {
            return "No such group.";
        }

        groupRepository.delete(groupRepository.findById(id).get());
        return "Deleted.";
    }

    public void changeProfile(GroupProfileRequest req) {
        Group group = groupRepository.findById(req.getGroup()).get();
        Photo profile = photoRepository.findById(req.getPhoto()).get();
        group.setProfilePicture(profile);
        groupRepository.save(group);
    }

    public String selectGroup(SelectGroupRequest req) {
        Group group = groupRepository.findById(req.id).get();
        group.setSelected(req.status);
        groupRepository.save(group);
        return "Selected";
    }

    public GroupDto getGroup(GroupInfoRequest req) {
        Set<Photo> likedPhotos;
        boolean joined = false;
        Group group = groupRepository.findById(req.id).get();

        if (req.token == null) {
            likedPhotos = new HashSet<>();
        } else {
            String email = jwtService.extractUsername(req.token);
            User user = userRepository.findById(email).get();
            likedPhotos = user.getLikedPhotos();
            joined = group.getMembers().contains(user);

        }
        Group parent = group.getParent();

        GroupRelative gp = parent == null ? null
                : GroupRelative.builder()
                        .id(parent.getId())
                        .imgSrc(parent.getProfilePicture() == null ? null : parent.getProfilePicture().getPath())
                        .name(parent.getName()).build();
        Set<GroupRelative> gr = new HashSet<GroupRelative>(group.getChildren().stream().map(g -> {
            return GroupRelative.builder()
                    .id(g.getId())
                    .imgSrc(g.getProfilePicture() == null ? null : g.getProfilePicture().getPath())
                    .name(g.getName()).build();

        }).toList());

        Set<GroupPhoto> photos = new HashSet<GroupPhoto>(
                group.getPhotos().stream()
                        .map(photo -> GroupPhoto.builder().id(photo.getFileName()).src(photo.getPath())
                                .liked(likedPhotos.contains(photo)).build())
                        .toList());
        Set<GroupMember> members = new HashSet<GroupMember>(
                group.getMembers().stream()
                        .map(member -> GroupMember.builder().id(member.getId()).name(member.getName()).imgSrc(
                                member.getProfilePicture() == null ? null : member.getProfilePicture().getPath())
                                .build())
                        .toList());
        return GroupDto.builder()
                .name(group.getName())
                .imgSrc(group.getProfilePicture() != null ? group.getProfilePicture().getPath() : null)
                .parent(gp)
                .joined(joined)
                .photos(photos)
                .subgroups(gr)
                .members(members)
                .build();
    }

    public List<GroupLinkDto> getSelected() {
        List<Group> topGroups = groupRepository.findAllBySelected(true);
        return topGroups.stream().map((group) -> GroupLinkDto.builder().id(group.getId()).name(group.getName())
                .imgSrc(group.getProfilePicture().getPath()).build()).toList();
    }
}
