package com.arc.ArchLab.model.components;


import com.arc.ArchLab.model.ComponentMetrics.RPS;
import com.arc.ArchLab.model.enums.ComponentType;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Client extends Component{

        private RPS rps;

        public Client(String name, RPS rps){
            super(ComponentType.CLIENT, name);
            this.rps = rps;
        }
}
