package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.LeaveForm;

public interface LeaveFormRepository extends CrudRepository<LeaveForm, String> {
}