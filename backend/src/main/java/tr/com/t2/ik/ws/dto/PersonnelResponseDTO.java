package tr.com.t2.ik.ws.dto;

import lombok.Builder;
import lombok.Data;
import tr.com.t2.ik.model.Role;

import java.util.Set;

@Data
@Builder
public class PersonnelResponseDTO {

    private String username;

    private Set<Role> roles;
}
