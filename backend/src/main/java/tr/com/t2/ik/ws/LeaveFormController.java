package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.LeaveForm;
import tr.com.t2.ik.model.Personnel;
import tr.com.t2.ik.repository.LeaveFormRepository;
import tr.com.t2.ik.ws.dto.JwtRequest;
import tr.com.t2.ik.ws.dto.PersonnelResponseDTO;
import tr.com.t2.ik.ws.dto.LeaveFormResponseDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/leaveform")
@RestController
public class LeaveFormController {
    @Autowired
    private LeaveFormRepository leaveFormRepository;
    @PostMapping
    public void add(@RequestBody JwtRequest authenticationRequest){
        LeaveForm newform = new LeaveForm();
        newform.setUsername(authenticationRequest.getUsername());
        newform.setDate(authenticationRequest.getDate());
        newform.setCount(authenticationRequest.getCount());
        newform.setReason(authenticationRequest.getReason());
        newform.setType(authenticationRequest.getType());
        leaveFormRepository.save(newform);
    }

    public LeaveFormResponseDTO getLeaveForm(long id) {
        Optional<LeaveForm> leaveFormOptional = leaveFormRepository.findById(id);
        if (leaveFormOptional.isPresent()) {
            return LeaveFormResponseDTO
                    .builder()
                    .id(leaveFormOptional.get().getId())
                    .username(leaveFormOptional.get().getUsername())
                    .date(leaveFormOptional.get().getDate())
                    .count(leaveFormOptional.get().getCount())
                    .type(leaveFormOptional.get().getType())
                    .reason(leaveFormOptional.get().getReason())
                    .build();
        }
        return null;
    }

    @RequestMapping("/{username}/forms")
    @GetMapping
    public List<LeaveFormResponseDTO> show (@PathVariable("username") String username){
        List<LeaveForm> list = new ArrayList<>();
        leaveFormRepository.findAll().forEach(list::add);
        List<LeaveFormResponseDTO> list1 = new ArrayList<>();
        for (int i =0; i<list.size();i++) {
            if(username.equals(list.get(i).getUsername())) {
                list1.add(getLeaveForm(list.get(i).getId()));
            }
        }
        return list1;
    }
}