import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../hooks/useAuth";
import { getEmployeeByEmail } from "../services/employeeService";
import { showError } from "../utils/error";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

type GoogleJwtPayload = {

  email: string;

  name: string;

  picture?: string;

};

function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [loading,setLoading] = useState(false);

    const handleLogin = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            showError(new Error("ログイン認証未取得"));
            return;
        }
        setLoading(true);
        try {
            const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential!);
            const result = await getEmployeeByEmail({email:decoded.email});
            setUser(result);
            navigate("/home");
        } catch (error) {
            showError(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 to-indigo-100">

            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 sm:p-10 border border-gray-200">

                <div className="mb-8">

                    <PageHeader title="ログイン"/>

                    <p className="text-gray-600 text-center mt-2">Google アカウントでログイン</p>

                </div>

                <div className="flex justify-center">
                    {loading
                    ? (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">ログイン中...</p>
                        </div>
                    )
                    : (
                        <div className="w-full">
                            <GoogleLogin
                                onSuccess={handleLogin}
                                onError={() => {
                                    console.log("Login Failed");
                                    showError(new Error("Googleログイン失敗しました"));
                                }}
                            />
                        </div>
                    )}
                </div>

            </div>

        </div>

    );

}

export default LoginPage;