package com.arc.ArchLab.model.components;

import com.arc.ArchLab.model.enums.ComponentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public abstract class Component {

    private ComponentType componentType;
    private String name;
}
