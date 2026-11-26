package com.arc.ArchLab;

import com.arc.ArchLab.exceptions.ArchExceptionMapper;
import com.arc.ArchLab.managed.DatabaseClients;
import com.arc.ArchLab.repository.UserRepository;
import com.arc.ArchLab.resources.AuthResource;
import com.arc.ArchLab.resources.HelloResource;
import com.arc.ArchLab.services.contracts.AuthService;
import com.arc.ArchLab.services.impl.AuthServiceImpl;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.federecio.dropwizard.swagger.SwaggerBundle;
import io.federecio.dropwizard.swagger.SwaggerBundleConfiguration;

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

        bootstrap.addBundle(new SwaggerBundle<ArchLabConfiguration>() {
            @Override
            protected SwaggerBundleConfiguration getSwaggerBundleConfiguration(ArchLabConfiguration configuration) {
                return configuration.swaggerBundleConfiguration;
            }
        });
    }
    @Override
    public void run(ArchLabConfiguration configuration, Environment environment) {
        DatabaseClients databaseClients = new DatabaseClients(configuration);
        environment.lifecycle().manage(databaseClients);
        registerResources(databaseClients, environment);
    }


    public void registerResources(DatabaseClients databaseClients, Environment environment){
        UserRepository userRepository = new UserRepository(databaseClients.getElasticsearchClient());
        AuthService authService = new AuthServiceImpl(userRepository);

        environment.jersey().register(new HelloResource());
        environment.jersey().register(new AuthResource(authService));
        environment.jersey()
                .register(new ArchExceptionMapper());
    }
}
