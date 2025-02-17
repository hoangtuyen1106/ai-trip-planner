import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import image from "/placeholder.jpg";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItemSection({ place }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        // place && GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName,
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
            to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
            target="_blank"
        >
            <div className="border rounded-xl p-3 mt-2 gap-5 group">
                <div className="">
                    <h4 className="font-bold text-lg">{place?.placeName}</h4>
                    <p className="text-sm text-gray-400">
                        {place.placeDetails}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItemSection;
