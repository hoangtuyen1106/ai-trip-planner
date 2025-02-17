import { Button } from "../ui/button";
import image from "/placeholder.jpg";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";


function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, []);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.tripData?.tripDetails?.location,
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        });
    };
    return (
        <>
            <img
                src={photoUrl ? photoUrl : image}
                alt="placeholder"
                className="h-[340px] w-full object-cover rounded "
            />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h3 className="font-bold text-2xl aa">
                        {trip?.tripData?.tripDetails?.location}
                    </h3>
                    <div className="flex gap-2 flex-wrap md:gap-5">
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip?.userSelection?.noOfDays} Ngày
                        </p>
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💸 {trip?.userSelection?.budget} Chi phí{" "}
                        </p>
                        <p className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🥂 Số lượng khách du lịch:{" "}
                            {trip?.userSelection?.traveler}
                        </p>
                    </div>
                </div>
                <Button>
                    <IoIosSend />
                </Button>
            </div>
        </>
    );
}

export default InfoSection;
