package com.mjt.tu.alumni.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "item_requests")
public class ItemRequest extends Request {
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;

    private String type;

    private String color;

    @Column(name = "is_read")
    private boolean read = false;

    private int qty;

    private double price;

    public ItemRequest(Status status, User sender, User receiver, Photo photo, String type, String color, boolean read,
            int qty, double price) {
        super(status, sender);
        this.receiver = receiver;
        this.photo = photo;
        this.type = type;
        this.color = color;
        this.read = read;
        this.qty = qty;
        this.price = price;
    }

}
