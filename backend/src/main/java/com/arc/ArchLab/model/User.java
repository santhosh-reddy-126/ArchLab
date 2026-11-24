package com.arc.ArchLab.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @NotNull
    private String id;

    @NotNull
    private String username;

    @NotNull
    private String password;
}
