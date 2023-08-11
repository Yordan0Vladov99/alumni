package com.mjt.tu.alumni.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "alumni_group")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(length = 30)
    private String name;

    private boolean selected;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Group parent;

    @OneToMany(mappedBy = "parent")
    private Set<Group> children;

    @OneToMany(mappedBy = "group")
    private Set<Photo> photos;

    @ManyToMany(mappedBy = "groups")
    Set<User> members;

    @ManyToOne
    @JoinColumn(name = "photo_id")
    private Photo profilePicture;

    public Group(long id, String name) {
        this.id = id;
        this.name = name;
        this.selected = false;
        this.members = new HashSet<>();
        this.children = new HashSet<>();
    }

    public void addPhoto(Photo photo) {
        this.photos.add(photo);
    }

    public void addMember(User member) {
        this.members.add(member);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Group other = (Group) obj;
        if (id != other.id)
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        return result;
    }

}
