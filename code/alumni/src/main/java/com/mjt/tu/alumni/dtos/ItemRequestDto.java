package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ItemRequestDto {
    public String user;
    public String img;
    public String type;
    public String color;
    public double price;
    public int qty;
}
