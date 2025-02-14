import { useEffect, useState } from "react";
import { chatSession } from "@/service/AIModal";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AI_PROMPT,
    SelectBudgetOptions,
    SelectTravelesList,
} from "@/constants/options";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import logo from "/logo.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";


function CreateTripPage() {
    const [formData, setFormData] = useState([]);
    const [openDailog, setOpenDailog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleLogin = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    });

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpenDailog(true);
            return;
        }
        if (
            (formData?.noOfDays > 5 && !formData?.location) ||
            !formData?.budget ||
            !formData?.noOfDays ||
            !formData?.traveler
        ) {
            toast("Cac du lieu khong duoc de trong");
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
            .replace("{totalDays}", formData?.noOfDays)
            .replace("{traveler}", formData?.traveler)
            .replace("{bubget}", formData?.budget)
            .replace("{totalDays}", formData?.noOfDays);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log("---", result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    };
    const SaveAiTrip = async (tripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(tripData),
            userEmail: user?.email,
            id: docId,
        });
        setLoading(false);
        navigate('/trip/' + docId);
    };

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
                OnGenerateTrip();
            });
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">
                Hãy cho chúng tôi biết sở thích du lịch của bạn 🏕️🌴
            </h2>
            <p className="mt-3 text-gray-500 text-xl">
                Chỉ cần cung cấp một số thông tin cơ bản và dự định kế hoạch
                chuyến đi của chúng tôi sẽ tạo hành trình tùy chỉnh dựa trên sở
                thích của bạn.
            </p>
            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label
                            className="text-xl my-3 font-medium"
                            htmlFor="location"
                        >
                            Lựa chọn địa điểm
                        </Label>
                        <Input
                            type="text"
                            onChange={(e) =>
                                handleInputChange("location", e.target.value)
                            }
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label
                            className="text-xl my-3 font-medium"
                            htmlFor="noOfDays"
                        >
                            Bạn dự định đi du lịch bao nhiêu ngày?
                        </Label>
                        <Input
                            type="number"
                            onChange={(e) =>
                                handleInputChange("noOfDays", e.target.value)
                            }
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-xl my-3 font-medium">
                        Chi phí cho điều này
                    </h3>
                    <ul className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <li
                                key={index}
                                onClick={() =>
                                    handleInputChange("budget", item.title)
                                }
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow ${
                                    formData?.budget === item.title &&
                                    "shadow-lg border-black"
                                }`}
                            >
                                <span className="text-4xl">{item.icon}</span>
                                <h3 className="font-bold text-lg">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {item.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-3xl">
                        Dự định đi du lịch cùng ai trong chuyến phiêu lưu tiếp
                        theo?
                    </h2>
                    <ul className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelesList.map((item, index) => (
                            <li
                                key={index}
                                onClick={() =>
                                    handleInputChange("traveler", item.people)
                                }
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow ${
                                    formData?.traveler === item.people &&
                                    "shadow-lg border-black"
                                }`}
                            >
                                <span className="text-4xl">{item.icon}</span>
                                <h3 className="font-bold text-lg">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {item.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="my-10 justify-end flex">
                <Button onClick={OnGenerateTrip} disable={loading}>
                    {loading ? (
                        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                    ) : (
                        "Tạo chuyến đi AI"
                    )}
                </Button>
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

export default CreateTripPage;
