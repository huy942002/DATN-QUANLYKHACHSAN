package com.fpoly.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ConfigTime implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false, precision = 10)
    private int id;

    @Column(name = "NAME", length = 255)
    private String name;

    @Column(name = "TIME", length = 255)
    private String time;

    @Column(name = "STATUS", nullable = false, precision = 10)
    private int status;
}
