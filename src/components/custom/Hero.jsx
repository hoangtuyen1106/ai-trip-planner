import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
    return (
        <>
            <div className="flex flex-col items-center mx-56 gap-9">
                <h1 className="font-extrabold text-[50px] text-center mt-16">
                    <span className="text-[#f56551]">
                        Khám phá cuộc phiêu lưu tiếp theo của bạn với AI:
                    </span>{" "}
                    Hành trình được cá nhân hóa trong tầm tay bạn
                </h1>
                <p className="text-xl text-gray-500 text-center">
                    Lập kế hoạch chuyến đi và quản lý chuyến đi cá nhân của bạn,
                    tạo ra các hành trình tùy chỉnh phù hợp với sở thích và ngân
                    sách của bạn.
                </p>
                <Button> <Link to='/create-trip'>Bắt đầu ngay thôi</Link> </Button>
            </div>
        </>
    );
}

export default Hero;
