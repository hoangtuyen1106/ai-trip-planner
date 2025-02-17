import HotelsSection from "@/components/TripDetail/HotelsSection";
import InfoSection from "@/components/TripDetail/InfoSection";
import PlacesToVisitSection from "@/components/TripDetail/PlacesToVisitSection";
import TravelTipSection from "@/components/TripDetail/TravelTipSection";
import { db } from "@/service/firebaseConfig";
import { GetPhoto } from "@/service/UnsplashApi";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function TripDetailPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);
    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            toast("No trip Found!");
        }
    };
    
    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <InfoSection trip={trip} />
            <p className="text-gray-600">
                Lưu ý: Giá khách sạn có tính chất tham khảo và có thể thay đổi
                rất nhiều tùy theo mùa và tình trạng sẵn có.
            </p>
            <HotelsSection trip={trip} />
            <PlacesToVisitSection trip={trip} />
            <TravelTipSection trip={trip} />
        </div>
    );
}

export default TripDetailPage;
