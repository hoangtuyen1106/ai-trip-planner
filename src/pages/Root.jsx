import Header from "@/components/custom/Header";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
                <Header />
                <Toaster />
                <main>
                    <Outlet />
                </main>
            </GoogleOAuthProvider>
        </>
    );
}

export default RootLayout;
