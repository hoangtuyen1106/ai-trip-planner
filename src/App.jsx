import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import CreateTripPage from "./pages/CreateTrip";
import RootLayout from "./pages/Root";
import TripDetailPage from "./pages/TripDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "/create-trip",
                element: <CreateTripPage />,
            },
            {
                path: "/trip/:tripId",
                id: "trip-detail",
                element: <TripDetailPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
