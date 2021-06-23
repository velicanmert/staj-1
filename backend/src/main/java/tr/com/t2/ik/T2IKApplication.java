package tr.com.t2.ik;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.model.Role;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.repository.RoleRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;

@SpringBootApplication
public class T2IKApplication {

    public static void main(String[] args) {
        SpringApplication.run(T2IKApplication.class, args);
    }

    @Bean
    public CommandLineRunner addTestUsers (PersonnelRepository personnelRepository, RoleRepository roleRepository) {
        return (args) -> {

            Role admin = new Role();
            admin.setName("ROLE_ADMIN");

            Role user = new Role();
            user.setName("ROLE_USER");

            roleRepository.saveAll(Arrays.asList(admin,user));

            Personnel t2admin = new Personnel();
            t2admin.setUsername("t2admin");
            t2admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            t2admin.setRoles(new HashSet<>(Arrays.asList(admin, user)));
            t2admin.setBirthDate("01-01-0001");
            t2admin.setIdentificationNo("00000000001");
            t2admin.setStatus("active");

            Personnel mete = new Personnel();
            mete.setUsername("metehan.danaci");
            mete.setPassword(new BCryptPasswordEncoder().encode("mete"));
            mete.setRoles(new HashSet<>(Collections.singletonList(user)));
            mete.setBirthDate("11-11-1990");
            mete.setIdentificationNo("123456780");
            mete.setStatus("active");

            Personnel tan = new Personnel();
            tan.setUsername("tan.apaydin");
            tan.setPassword(new BCryptPasswordEncoder().encode("tan"));
            tan.setRoles(new HashSet<>(Collections.singletonList(user)));
            tan.setBirthDate("04-11-1990");
            tan.setIdentificationNo("11111111");
            tan.setStatus("active");

            personnelRepository.saveAll(Arrays.asList(t2admin,mete,tan));
        };
    }
}
