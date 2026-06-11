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

        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">

            <div className="flex justify-between items-center mb-6">

                <PageHeader title="Login"/>

            </div>

            <div className="grid gap-3">
                {loading
                ? (
                    <div>
                    ログイン中...
                    </div>
                )
                : (
                    <GoogleLogin
                        onSuccess={handleLogin}
                        onError={() => {
                            console.log("Login Failed");
                            showError(new Error("Googleログイン失敗しました"));
                        }}
                    />
                )}
            </div>

        </div>

    );

}

export default LoginPage;