package tr.com.t2.ik.ws.dto;

import java.io.Serializable;

public class JwtRequest implements Serializable {

    private String username;
    private String password;
    private String birth_date;
    private String identification_no;
    private String status;


    // need default constructor for JSON Parsing
    public JwtRequest() {

    }

    public JwtRequest(String username, String password, String birth_date, String identification_no) {
        this.setUsername(username);
        this.setPassword(password);
        this.setBirthDate(birth_date);
        this.setIdentificationNo(identification_no);
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
}