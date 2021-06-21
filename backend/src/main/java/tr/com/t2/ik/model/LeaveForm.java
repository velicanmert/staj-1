package tr.com.t2.ik.model;

import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Data
@Entity
public class LeaveForm {

    @Id
    @Column
    private String username;

    @Column
    private String date;
    @Column
    private String count;
    @Column
    private String type;
    @Column
    private String reason;
}