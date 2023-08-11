package com.mjt.tu.alumni.models;

import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "album")
public class Album extends Item {

    @Column(length = 20)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany
    @JoinTable(name = "album_photos", joinColumns = @JoinColumn(name = "album_id"), inverseJoinColumns = @JoinColumn(name = "photo_id"))
    Set<Photo> photos;

    @Column(length = 6)
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Album() {
        super();
    }

    public Album(String name, double price, int qty, User owner) {
        super(price, qty, owner);
        this.name = name;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public void addPhoto(Photo photo) {
        this.photos.add(photo);
    }

}
