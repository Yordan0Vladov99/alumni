package com.mjt.tu.alumni.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 45)
    private Status status;

    private LocalDateTime created = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    public Request(Status status, User sender) {
        this.status = status;
        this.sender = sender;
    }

    public Request() {

    }
}
