package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UpdateItemRequest {
    public long id;
    public String token;
    public String status;

}
