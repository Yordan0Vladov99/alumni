package com.mjt.tu.alumni.models;

import jakarta.persistence.*;

@MappedSuperclass
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private double price;
    private int qty;

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    public Item() {
    }

    public Item(double price, int qty, User owner) {
        this.price = price;
        this.owner = owner;
        this.qty = qty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
