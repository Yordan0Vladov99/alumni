package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CartItemDto {
    public String src;
    public String type;
    public double price;
    public int qty;
    public String color;
}
