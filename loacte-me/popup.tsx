import React, { useState } from "react";

function IndexPopup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocationData = async () => {
    try {
      setLoading(true);

      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();
      //const access_token = process.env.REACT_APP_IPINFO_ACCESS_TOKEN;
      const locationResponse = await fetch(`https://ipinfo.io/${ip}/json?token=9cc49aa03bed38`);
      const locationData = await locationResponse.json();
      setData(locationData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-500 h-500">
      <button
        className={`px-6 py-3 bg-blue-500 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        onClick={fetchLocationData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Show my location"}
      </button>
      {data && (
        <p className="mt-4">
          Your country is {data.country} and city is {data.city}
        </p>
      )}
    </div>
  );
}

export default IndexPopup;
