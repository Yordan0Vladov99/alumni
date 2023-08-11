package com.mjt.tu.alumni.dtos;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CartItemResponse {
    public long id;
    public String fileName;
    public String type;
    public int price;
}
