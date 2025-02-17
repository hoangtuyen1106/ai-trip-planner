import { Link } from "react-router-dom";
import image from "/placeholder.jpg";
import HotelCardItemSection from "./HotelCardItemSection";
import { useEffect } from "react";

function HotelsSection({ trip }) {
    useEffect(() => {
        trip && GetPlacePhoto();
    }, []);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.tripData?.tripDetails?.location,
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
        <div>
            <h2 className="font-bold text-xl my-5">Khách sạn đề xuất</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItemSection hotel={hotel} key={index} />
                ))}
            </div>
        </div>
    );
}

export default HotelsSection;
