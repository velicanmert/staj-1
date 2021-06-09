package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.Role;

public interface RoleRepository extends CrudRepository<Role, String> {
}
