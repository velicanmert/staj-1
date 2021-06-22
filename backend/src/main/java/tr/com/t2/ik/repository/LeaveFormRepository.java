package tr.com.t2.ik.repository;

import org.springframework.data.repository.CrudRepository;
import tr.com.t2.ik.model.LeaveForm;

import java.util.Optional;

public interface LeaveFormRepository extends CrudRepository<LeaveForm, String> {
    Optional<LeaveForm> findById(long id);
}