package com.mjt.tu.alumni.dtos;

import java.time.LocalDateTime;

import com.mjt.tu.alumni.models.Status;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ItemRequestResponse {
    public long id;
    public Status status;
    public boolean read;
    public LocalDateTime sent;
    public CartItemDto item;
}
