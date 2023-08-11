package com.mjt.tu.alumni.dtos;

import java.time.LocalDateTime;

import com.mjt.tu.alumni.models.Status;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PhotoSessionResponse {
    public long id;
    public int people;
    public LocalDateTime date;
    public String location;
    public Status status;
}
