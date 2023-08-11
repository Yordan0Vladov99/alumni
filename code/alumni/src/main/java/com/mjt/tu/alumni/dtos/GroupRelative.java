package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class GroupRelative {
    public long id;
    public String name;
    public String imgSrc;
}
