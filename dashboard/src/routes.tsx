import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import Home from "./pages/Home/Home"
import Layout from "./components/Layout"
import TransactionForm from "./pages/ManagerTransactions/TransactionForm"
import EditTransactions from "./pages/EditTransactions/EditTransactions"
import DeleteTransaction from "./pages/DeleteTransaction/DeleteTransaction"
import MonthlyGoal from "./pages/MonthlyGoal/MonthlyGoal"
import Welcome from "./pages/Welcome/Welcome"
export const AppRoutes = () => {
  const ProtectedRoutes = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      return <Navigate to='/welcome' replace={true} />
    }
    return <Outlet />
  }

  return (
    <Router>
      <Routes>
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/' element={<ProtectedRoutes />}>
          <Route index element={<Navigate to='/dashboard' />} />
          <Route
            path='/dashboard'
            element={
              <Layout>
                <Home />
              </Layout>
            }>
            <Route path='monthlyGoal' element={<MonthlyGoal />} />
            <Route path='editTransaction' element={<EditTransactions />} />
            <Route path='deleteTransaction' element={<DeleteTransaction />} />
            <Route
              path='addIncome'
              element={<TransactionForm typeTransaction='income' />}
            />
            <Route
              path='addExpense'
              element={<TransactionForm typeTransaction='expense' />}
            />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  )
}
