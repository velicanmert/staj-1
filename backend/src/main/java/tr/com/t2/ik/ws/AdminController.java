package tr.com.t2.ik.ws;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/admins")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @GetMapping
    public String getMethod(Principal principal) {
        return "Admin Area, Welcome " + principal.getName();
    }

}
