import { Link } from "react-router-dom";
import image from "/placeholder.jpg";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCardItemSection({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        // hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            const PhotoUrl = PHOTO_REF_URL.replace(
                "{NAME}",
                resp.data.places[0].photos[3].name
            );
            setPhotoUrl(PhotoUrl);
        });
    };
    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
            target="_blank"
        >
            <div className="group cursor-pointer">
                <div className="my-2 flex flex-col gap-2">
                    <h3 className="font-medium">{hotel?.hotelName}</h3>
                    <p className="text-xs text-gray-500">
                        📍 {hotel?.hotelAddress}
                    </p>
                    <p className="text-sm">💰 {hotel?.price?.range}</p>
                    <p className="text-sm">⭐ {hotel?.rating}</p>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItemSection;
