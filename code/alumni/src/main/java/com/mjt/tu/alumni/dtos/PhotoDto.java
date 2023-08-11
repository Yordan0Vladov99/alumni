package com.mjt.tu.alumni.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PhotoDto {
    public String fileName;
    public String fileExtension;
    public String userName;
    public LocalDateTime created;
}
