package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.PersonnelRepository;
import tr.com.t2.ik.ws.dto.JwtRequest;
import tr.com.t2.ik.ws.dto.PersonnelResponseDTO;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.text.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ROLE_USER')")
public class UserController {

    @Autowired
    public PersonnelRepository personnelRepository;

    @GetMapping
    public String getMethod() {
        return "User Area, Welcome";
    }

    @GetMapping
    @RequestMapping("/{username}")
    public PersonnelResponseDTO getPersonnel(@PathVariable("username") String username) {
        Optional<Personnel> personnelOptional = personnelRepository.findById(username);
        if (personnelOptional.isPresent()) {
            return PersonnelResponseDTO
                    .builder()
                    .username(personnelOptional.get().getUsername())
                    .roles(personnelOptional.get().getRoles())
                    .dateBirth(personnelOptional.get().getBirthDate())
                    .identificationNo(personnelOptional.get().getIdentificationNo())
                    .status(personnelOptional.get().getStatus())
                    .build();

        }
        return null;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping("/{username}/edit")
    @PutMapping
    public void change(@PathVariable("username") String username, @RequestBody JwtRequest authenticationRequest) throws Exception {

        Optional<Personnel> person = personnelRepository.findById(username);
        person.get().setBirthDate(authenticationRequest.getBirth_date());
        person.get().setIdentificationNo(authenticationRequest.getIdentification_no());
        getPersonnel(username);
        personnelRepository.save(person.get());

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/{username}/delete")
    @DeleteMapping
    public void delete(@PathVariable("username") String username) throws Exception {

        Optional<Personnel> person = personnelRepository.findById(username);
        person.get().setStatus("deleted");
        getPersonnel(username);
        personnelRepository.save(person.get());

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/showall")
    @GetMapping
    public List<PersonnelResponseDTO> show (){
        List<Personnel> list = new ArrayList<>();
        personnelRepository.findAll().forEach(list::add);
        List<PersonnelResponseDTO> list1 = new ArrayList<>();
        for (int i =0; i<list.size();i++) {
            list1.add( getPersonnel(list.get(i).getUsername()));
            }


       return list1;
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/search")
    @PostMapping
    public List<PersonnelResponseDTO> search(@RequestBody JwtRequest abc)throws ParseException{
        SimpleDateFormat date = new SimpleDateFormat("dd-MM-yyyy");
        Date date1 = date.parse(abc.getBirth_date());
        List<Personnel> list = new ArrayList<>();
        personnelRepository.findAll().forEach(list::add);
        List<PersonnelResponseDTO> list1 = new ArrayList<>();

        for(int i =0; i< list.size();i++){
            Date date2 = date.parse(list.get(i).getBirthDate());
            // Girdiğimiz tarihten kücük olanı bastırıyorum hberiniz olsun
            if(date1.compareTo(date2)<0)
            {
                    list1.add( getPersonnel(list.get(i).getUsername()));
            }

        }
        return list1 ;

    }

}




