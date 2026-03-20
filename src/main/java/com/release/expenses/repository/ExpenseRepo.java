package com.release.expenses.repository;

import com.release.expenses.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense,Long> {

//    @Query(value = "select b.name, sum(e.amount) from Bank b join b.expense e where e.userId = :userid group by b.name")
    @Query(value = "select so.name, sum(se.amount) from su_expenses se left join su_origin so on se.origin_id=so.id where se.user_id=:userid group by so.name;", nativeQuery = true)
    List<Object[]> getExpenseGroupByBank(@Param("userid") Long userid);

    @Query(value = "select DATE_TRUNC('month', created_at) as month, sum(amount) from su_expenses where user_id=:userid group by month order by month" , nativeQuery = true)
    List<Object[]> getExpenseGroupByMonth(@Param("userid") Long userid);

    @Query(value = "select CAST(SUM(amount) AS DOUBLE PRECISION) from su_expenses se where user_id=:userid", nativeQuery = true)
    Double getTotalExpense(@Param("userid") Long userid);
}
