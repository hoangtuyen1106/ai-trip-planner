import React from "react";
import { Link } from "react-router-dom";
//3:30:12
function UserTripCardItemSection({ trip }) {
    return (
        <Link to={"/trip/" + trip?.id}>
            <div className="group">
                <div className="overflow-hidden rounded-xl">
                    <img
                        src={trip.userSelection.travelImage || "/placeholder.jpg"}
                        className="object-cover group-hover:scale-105 transition-all h-[220px] w-full"
                    />
                </div>
                <div>
                    <h2 className="font-bold text-lg">
                        {trip?.userSelection?.location}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {trip?.userSelection.noOfDays} ngày với chi phí{" "}
                        {trip?.userSelection.budget}
                    </p>
                </div>
            </div>
        </Link>
    );
}
// 444555
export default UserTripCardItemSection;
