package com.arc.ArchLab.model.components;


import com.arc.ArchLab.model.ComponentMetrics.RPS;
import com.arc.ArchLab.model.enums.ComponentType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Database extends Component{
    private RPS rps;
    public Database(String name, RPS rps) {
        super(ComponentType.DATABASE, name);
        this.rps = rps;
    }
}
