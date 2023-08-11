package com.mjt.tu.alumni.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "photo_session")

public class PhotoSession extends Request {

    private int people;

    @Column(name = "session_date")
    private LocalDateTime sessionDate;

    @Column(length = 500)
    private String location;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    public PhotoSession() {
        super();
    }

    public PhotoSession(String description, Status status, User sender, int people, LocalDateTime sessionDate,
            String location, User receiver) {
        super(status, sender);
        this.people = people;
        this.sessionDate = sessionDate;
        this.location = location;
        this.receiver = receiver;
    }

    public int getPeople() {
        return people;
    }

    public void setPeople(int people) {
        this.people = people;
    }

    public LocalDateTime getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDateTime sessionDate) {
        this.sessionDate = sessionDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

}
