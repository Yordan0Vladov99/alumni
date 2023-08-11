package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class GroupMember {
    public String id;
    public String name;
    public String imgSrc;
}
