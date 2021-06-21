package tr.com.t2.ik.ws;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import tr.com.t2.ik.model.LeaveForm;
import tr.com.t2.ik.repository.LeaveFormRepository;
import tr.com.t2.ik.ws.dto.JwtRequest;
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
}