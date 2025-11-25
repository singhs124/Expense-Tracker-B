package com.release.expenses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories(basePackages = {
		"com.release.expenses.repository",
		"com.release.expenses.auth.repository",
		"com.release.expenses.user.repository"
})
@SpringBootApplication
public class ExpensesApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(ExpensesApplication.class, args);
	}

}
