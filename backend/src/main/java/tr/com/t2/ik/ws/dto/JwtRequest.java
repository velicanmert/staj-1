package tr.com.t2.ik.ws.dto;

import java.io.Serializable;

public class JwtRequest implements Serializable {

    private String username;
    private String password;
    private String birth_date;
    private String identification_no;
    private String status;
    private String date;
    private String count;
    private String reason;
    private String type;


    // need default constructor for JSON Parsing
    public JwtRequest() {

    }

    public JwtRequest(String username, String password, String birth_date, String identification_no, String status, String date, String type, String reason, String count) {
        this.setUsername(username);
        this.setPassword(password);
        this.setBirthDate(birth_date);
        this.setIdentificationNo(identification_no);
        this.setStatus(status);
        this.setDate(date);
        this.setType(type);
        this.setReason(reason);
        this.setCount(count);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBirth_date() {
        return this.birth_date;
    }

    public void setBirthDate(String birth_date) {
        this.birth_date = birth_date;
    }

    public String getIdentification_no() {
        return this.identification_no;
    }

    public void setIdentificationNo(String identification_no) {
        this.identification_no = identification_no;
    }

    public String getStatus(){
        return this.status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public String getDate() { return this.date; }

    public void setDate(String date) { this.date = date; }

    public String getCount() { return this.count; }

    public void setCount(String count) { this.count = count; }

    public String getType() { return this.type; }

    public void setType(String type) { this.type=type; }

    public String getReason() { return this.reason; }

    public void setReason(String reason){ this.reason = reason; }
}