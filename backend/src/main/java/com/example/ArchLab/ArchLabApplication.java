package com.example.ArchLab;

import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import com.example.ArchLab.managed.DatabaseClients;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class ArchLabApplication extends Application<ArchLabConfiguration> {
    public static void main(String[] args) throws Exception {
        new ArchLabApplication().run(args);
    }
    @Override
    public String getName() {
        return "ArchLab";
    }
    @Override
    public void initialize(Bootstrap<ArchLabConfiguration> bootstrap) {
        bootstrap.setConfigurationSourceProvider(new SubstitutingSourceProvider(
                bootstrap.getConfigurationSourceProvider(),
                new EnvironmentVariableSubstitutor(true)
        ));
    }
    @Override
    public void run(ArchLabConfiguration configuration, Environment environment) {
        environment.lifecycle().manage(new DatabaseClients(configuration));
    }
}
