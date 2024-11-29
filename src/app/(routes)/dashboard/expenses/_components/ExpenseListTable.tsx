import { Trash } from "lucide-react";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

// Expense Type
interface Expense {
    id: number;
    name: string;
    amount: string;
    createdAt: string;
}

// Props type
interface ExpenseListTableProps {
    expensesList: Expense[];
    refreshData: () => void;
}

function ExpenseListTable({ expensesList, refreshData }: ExpenseListTableProps) {

    const deleteExpense = async (expense: any) => {

        const result = await db
            .delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            toast('Expnese Has Been Removed!');
            refreshData()
        }
    }

    return (
        <div className="mt-3">
            <div className="grid grid-cols-4 bg-slate-200 p-2">
                <h2 className="font-bold">Name</h2>
                <h2 className="font-bold">Amount</h2>
                <h2 className="font-bold">Date</h2>
                <h2 className="font-bold">Remove</h2>
            </div>
            {expensesList.map((expense, index) => (
                <div className="grid grid-cols-4 bg-slate-50 p-2">
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{expense.createdAt}</h2>
                    <h2>
                        <Trash
                            className="text-red-500 cursor-pointer"
                            onClick={() => deleteExpense(expense)}
                        />
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default ExpenseListTable;