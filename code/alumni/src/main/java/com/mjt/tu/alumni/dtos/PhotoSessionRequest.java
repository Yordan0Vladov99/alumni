package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PhotoSessionRequest {
    public String sender;
    public int people;
    public String date;
    public String time;
    public String location;
    public String description;
}
