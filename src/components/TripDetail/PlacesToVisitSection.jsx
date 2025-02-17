import PlaceCardItemSection from "./PlaceCardItemSection";

function PlacesToVisitSection({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-xl my-5">Địa điểm tham quan</h2>
            <div>
                {trip?.tripData?.itinerary?.map((item, index) => (
                    <div key={index} className="mt-5">
                        <h3 className="font-medium text-lg">
                            {item.day}
                        </h3>
                        <div className="grid grid-cols-2 gap-5">
                            {item?.plan.map((place, indexPlace) => (
                                <div key={indexPlace}>
                                    <p className="font-medium text-sm text-orange-600">
                                        {place.time}
                                    </p>
                                    <PlaceCardItemSection place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisitSection;
