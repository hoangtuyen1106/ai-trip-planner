export const SelectTravelesList = [
    {
        id: 1,
        title: "Chỉ Mình Tôi",
        desc: "Một mình trên hành trình khám phá",
        icon: "✈️",
        people: "1 Người",
    },
    {
        id: 2,
        title: "Cặp Đôi",
        desc: "Hai người đồng hành cùng nhau",
        icon: "🥂",
        people: "2 Người",
    },
    {
        id: 3,
        title: "Gia Đình",
        desc: "Một gia đình hạnh phúc, vui vẻ",
        icon: "🏡",
        people: "3 đến 5 Người",
    },
    {
        id: 4,
        title: "Bạn Bè",
        desc: "Một nhóm cùng chí hướng",
        icon: "⛵",
        people: "5 đến 10 Người",
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Rẻ",
        desc: "Lưu ý đến chi phí",
        icon: "💵",
    },
    {
        id: 2,
        title: "Vừa phải",
        desc: "Chi phí ở mức trung bình",
        icon: "💰",
    },
    {
        id: 3,
        title: "Sang trọng / Cao cấp",
        desc: "Không lo về chi phí",
        icon: "💸",
    },
];

export const AI_PROMPT='Tạo kế hoạch du lịch cho địa điểm: {location}, trong {totalDays} ngày cho {traveler} người với mức chi phí {bubget}, Cung cấp cho tôi danh sách tùy chọn Khách sạn với Tên khách sạn, Địa chỉ khách sạn, Giá, url hình ảnh khách sạn, tọa độ địa lý, xếp hạng, mô tả và đề xuất hành trình với Tên địa điểm, Chi tiết địa điểm, Url hình ảnh địa điểm, Tọa độ địa lý, Giá vé, xếp hạng, Thời gian di chuyển từng địa điểm trong {totalDays} ngày với kế hoạch mỗi ngày với thời gian ghé thăm tốt nhất ở định dạng JSON.'