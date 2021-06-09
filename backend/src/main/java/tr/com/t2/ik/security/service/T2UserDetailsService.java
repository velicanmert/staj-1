package tr.com.t2.ik.security.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.PersonnelRepository;

import java.util.Optional;

@Service
public class T2UserDetailsService implements UserDetailsService {

    private PersonnelRepository personnelRepository;

    public T2UserDetailsService(PersonnelRepository personnelRepository) {
        this.personnelRepository = personnelRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Personnel> personnel = personnelRepository.findById(username);
        if (personnel.isPresent()) {
            return User.withUsername(
                    personnel.get().getUsername())
                    .password(personnel.get().getPassword())
                    .accountExpired(false)
                    .credentialsExpired(false)
                    .authorities(personnel.get().getRoles())
                    .disabled(false).accountLocked(false).build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }
}
