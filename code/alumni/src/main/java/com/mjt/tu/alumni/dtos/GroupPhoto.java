package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class GroupPhoto {
    public String id;
    public String src;
    public boolean liked;
}
