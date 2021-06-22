package tr.com.t2.ik.ws.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaveFormResponseDTO {
    private long id;
    private String username;
    private String date;
    private String count;
    private String type;
    private String reason;
}

