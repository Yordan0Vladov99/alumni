package com.mjt.tu.alumni.dtos;

import java.util.List;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ShareRequest {
    public String token;
    public String img;
    public List<String> receivers;
}
