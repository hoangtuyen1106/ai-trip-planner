import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function TripDetailPage() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([])
    useEffect(
        () => {
            tripId && getTripData();
        },
        [tripId]
    );

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document: ", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No Such Document");
            toast("No trip Found!");
        }
    };
    return <div>TripDetailPage: {tripId}</div>;
}

export default TripDetailPage;
