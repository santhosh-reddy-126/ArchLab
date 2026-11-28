package com.arc.ArchLab.model.components;

import com.arc.ArchLab.model.ComponentMetrics.RPS;
import com.arc.ArchLab.model.enums.ComponentType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Server extends Component{
    private RPS rps;
    public Server(String name, RPS rps){
        super(ComponentType.SERVER, name);
        this.rps=rps;
    }
}
