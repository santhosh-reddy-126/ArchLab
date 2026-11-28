package com.arc.ArchLab.model.ComponentMetrics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
@Setter
public class RPS {

    @NotNull
    private Long readRps;
    @NotNull
    private Long writeRps;
}
