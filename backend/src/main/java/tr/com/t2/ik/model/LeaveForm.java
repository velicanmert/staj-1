package tr.com.t2.ik.model;

import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Data
@Entity
public class LeaveForm {

    @Id
    @GeneratedValue
    private long id;

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