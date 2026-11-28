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
public class GraphMetaDTO {

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String neoGraphId;
}
