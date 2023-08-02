package com.nagarro.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class Users {

	@Id
	@Column(name = "username")
	private String uname;
	@Column(name = "firstname")
	private String fname;
	@Column(name = "lastname")
	private String lname;
	@Column(name = "password")
	private String pass;

	public Users(String uname, String fname, String lname, String pass) {
		super();
		this.uname = uname;
		this.fname = fname;
		this.lname = lname;
		this.pass = pass;
	}

	public Users() {
		super();

	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

}
