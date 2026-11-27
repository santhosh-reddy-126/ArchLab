package com.arc.ArchLab.dao.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GraphRequest {

    @NotNull
    private String title;

    @NotNull
    private String description;
}
