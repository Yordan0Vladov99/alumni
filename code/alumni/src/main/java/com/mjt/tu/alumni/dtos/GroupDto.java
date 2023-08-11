package com.mjt.tu.alumni.dtos;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class GroupDto {
    public String name;
    public String imgSrc;
    public GroupRelative parent;
    public boolean joined;
    public Set<GroupPhoto> photos;
    public Set<GroupRelative> subgroups;
    public Set<GroupMember> members;

}
