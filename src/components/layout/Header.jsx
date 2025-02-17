import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "/logo.svg";
import { useEffect, useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [openDailog, setOpenDailog] = useState(false);
    
    useEffect(() => {
    });

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    });

    const GetUserProfile = (tokenInfo) => {
        axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo?.access_token}`,
                        Accept: "Application/json",
                    },
                }
            )
            .then((resp) => {
                localStorage.setItem("user", JSON.stringify(resp.data));
                setOpenDailog(false);
                window.location.reload();
            });
    };

    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <Link to="/">
                <img src={logo} />
            </Link>
            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <Link to="/create-trip">
                            <Button variant="outline" className="rounded-full cursor-pointer">
                                + Create Trip
                            </Button>
                        </Link>
                        <Link to="/my-trips">
                            <Button variant="outline" className="rounded-full cursor-pointer">
                                My Trip
                            </Button>
                        </Link>

                        <Popover>
                            <PopoverTrigger>
                                <img
                                    src={user?.picture}
                                    className="h-[50px] w-[50px] rounded-full"
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <p
                                    className="cursor-pointer"
                                    onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        window.location.reload();
                                    }}
                                >
                                    Logout
                                </p>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
                )}
            </div>
            <Dialog open={openDailog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            <img src={logo} alt="logo" />
                            <h2 className="font-bold text-lg mt-7">
                                Đăng nhập bằng Google
                            </h2>
                            <p>
                                Đăng nhập vào Ứng dụng bằng xác thực Google một
                                cách an toàn
                            </p>
                            <Button
                                onClick={handleLogin}
                                className="w-full mt-7 flex items-center"
                            >
                                <FcGoogle className="h-7 w-7" /> Đăng nhập bằng
                                Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
