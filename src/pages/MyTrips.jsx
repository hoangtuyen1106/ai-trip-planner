import UserTripCardItemSection from "@/components/MyTrips/UserTripCardItemSection";
import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

function MyTrips() {
    const navigation = useNavigation();
    const user = JSON.parse(localStorage.getItem("user"));
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        GetUserTrips();
    }, []);
    const GetUserTrips = async () => {
        if (!user) {
            navigation("/");
            return;
        }

        const q = query(
            collection(db, "AITrips"),
            where("userEmail", "==", user?.email)
        );
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            setUserTrips((prevVal) => [...prevVal, doc.data()]);
        });
    };
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trip</h2>
            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {userTrips?.length > 0
                    ? userTrips.map((trip, index) => (
                          <UserTripCardItemSection key={index} trip={trip} />
                      ))
                    : [1, 2, 3, 4, 5, 6].map((item, index) => (
                          <div
                              key={index}
                              className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
                          ></div>
                      ))}
            </div>
        </div>
    );
}

export default MyTrips;
