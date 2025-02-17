import FooterSection from "@/components/layout/FooterSection";
import Header from "@/components/layout/Header";
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
                <FooterSection />
            </GoogleOAuthProvider>
        </>
    );
}

export default RootLayout;
