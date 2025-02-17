function TravelTipSection({ trip }) {
  return (
    <div>
        <h3 className="font-bold text-xl my-5">Mẹo du lịch</h3>
        {trip?.tripData?.travelTips.map((tip) => (
            <p key={tip}>💡 {tip}</p>
        ))}
    </div>
  )
}

export default TravelTipSection