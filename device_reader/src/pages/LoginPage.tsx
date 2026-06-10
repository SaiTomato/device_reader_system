import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../hooks/useAuth";
import { getEmployeeByEmail } from "../services/employeeService";
import { showError } from "../utils/error";

function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleAdminLogin = () => {
        setUser({
            email:"admin@gmail.com",
            employeeName:"ADMIN",
            role:"admin",
            enabled:true
        });
        navigate("/home");
    };

    const handleUserLogin = () => {
        setUser({
            email:"user@gmail.com",
            employeeName:"USER",
            role:"user",
            enabled:true
        });
        navigate("/home");
    };

    const handleLogin = async () => {
        try {
            const result = await getEmployeeByEmail({email:"tomato.202504.tsoimk@gmail.com"});
            setUser(result);
            console.log(result)
            navigate("/home");
        } catch (error) {
            showError(error);
        }
    };

    return (

        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">

            <div className="flex justify-between items-center mb-6">

                <PageHeader title="Login"/>

            </div>

            <div className="grid gap-3">

                <button
                    onClick={handleLogin}
                >
                    Login
                </button>

                <button
                    className="bg-blue-600 text-white py-3 rounded-lg text-lg"
                    onClick={handleAdminLogin}
                >
                    Fake Admin Login
                </button>

                <button
                    className="bg-blue-600 text-white py-3 rounded-lg text-lg"
                    onClick={handleUserLogin}
                >
                    Fake User Login
                </button>

            </div>

        </div>

    );

}

export default LoginPage;