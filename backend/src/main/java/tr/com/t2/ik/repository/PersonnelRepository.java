package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.Personnel;

public interface PersonnelRepository extends CrudRepository<Personnel, String> {
}
