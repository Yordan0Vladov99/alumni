package com.mjt.tu.alumni.dtos;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class UserDto {
    public String name;
    public String email;
    public String profile;
    public Set<GroupPhoto> photos;
    public Set<GroupRelative> groups;
}