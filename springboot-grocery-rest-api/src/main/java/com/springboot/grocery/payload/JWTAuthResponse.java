package com.springboot.grocery.payload;

public class JWTAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long user_id;
    private String name;
    private String username;
    private String email;
    private String phone;
    private String address;
    private String customer_rating;
    private double credits;
    private Boolean is_manager;

    public JWTAuthResponse(String accessToken, Long user_id) {
        this.accessToken = accessToken;
        this.user_id = user_id;
    }
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCustomer_rating(String customer_rating) {
        this.customer_rating = customer_rating;
    }

    public void setCredits(double credits) {
        this.credits = credits;
    }

    public void setIs_manager(Boolean is_manager) {
        this.is_manager = is_manager;
    }

    public Long getUser_id() {
        return user_id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getCustomer_rating() {
        return customer_rating;
    }

    public double getCredits() {
        return credits;
    }

    public Boolean getIs_manager() {
        return is_manager;
    }
}
