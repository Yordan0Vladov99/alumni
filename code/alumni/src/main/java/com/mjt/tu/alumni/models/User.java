package com.mjt.tu.alumni.models;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @Column(length = 100)
    private String id;

    @Column(length = 100)
    private String password;

    @Column(length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(12) default 'USER'")
    private UserType type;

    @OneToMany(mappedBy = "user")
    private Set<Photo> photos;

    @ManyToOne
    @JoinColumn(name = "profile_picture")
    Photo profilePicture;

    @OneToMany(mappedBy = "owner")
    private Set<Album> albums;

    @OneToMany(mappedBy = "sender")
    private Set<PhotoSession> sentSessionRequests;

    @OneToMany(mappedBy = "receiver")
    private Set<PhotoSession> receivedSessionRequests;

    @OneToMany(mappedBy = "sender")
    private Set<ItemRequest> sentItemRequests;

    @OneToMany(mappedBy = "receiver")
    private Set<ItemRequest> receivedItemRequests;

    @ManyToMany
    @JoinTable(name = "membership", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Group> groups;

    @ManyToMany
    @JoinTable(name = "likes", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "photo_id"))
    private Set<Photo> likedPhotos;

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", password=" + password + ", name=" + name + ", type=" + type + ", photos=" + photos
                + "]";
    }

    public void addGroup(Group group) {
        this.groups.add(group);
    }

    public void removeGroup(Group group) {
        if (groups.contains(group)) {
            this.groups.remove(group);
        }
    }

    public void addPhoto(Photo photo) {
        this.photos.add(photo);
    }

    public void addLikedPhoto(Photo photo) {
        this.likedPhotos.add(photo);
    }

    public void removeLikePhoto(Photo photo) {
        if (likedPhotos.contains(photo)) {
            this.likedPhotos.remove(photo);
        }
    }

    public void addAlbum(Album item) {
        this.albums.add(item);
    }

    public void addSentItemRequest(ItemRequest request) {
        this.sentItemRequests.add(request);
    }

    public void addReceivedItemRequest(ItemRequest request) {
        this.receivedItemRequests.add(request);
    }

    public void addSentSessionRequest(PhotoSession request) {
        this.sentSessionRequests.add(request);
    }

    public void addReceivedSessionRequest(PhotoSession request) {
        this.receivedSessionRequests.add(request);
    }

    public User withoutPassword() {
        User result = new User();
        result.setName(this.name);
        return result;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(type.name()));
    }

    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
