// filepath: e:\Projects\Namaste Food\api\menu.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { restaurantId, lat, lng } = req.query;

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Platform: "dweb",
        DNT: "1",
        "Cookies": "__SW=mwooOs6JBP1L7Bc0CC17NQpgROJ6ZXo0; _device_id=ff4d8ba4-3ece-28d2-5b58-cde3005e1f8b; aws-waf-token=ae400b9c-5746-4672-a2be-fceedd558958:BQoAbAk5H9YpAAAA:FRv+qS50ndN7x63iZuanQxckb5oTjRiVjxM/fZydjFndNHO8qIlJfCWO3stL9g0dGabjzRcBuepnUQOrMvOsdspMR1a/QbEqQTC+s1RqhY7DN8aHVNlUmMNtuobRKkrFQwEmOp4MJJJzsKpaZBt96ssPk0pvsxTXJIgn9iCzadgiLR0SXjNReudZ+WjiCRA=; _guest_tid=0227d4a6-6e72-4783-9a12-8a28b0507314; _sid=nkd47fc5-d7d8-4e68-9bcd-0aa0e4871943; userLocation={%22lat%22:%2226.83730%22%2C%22lng%22:%2280.91650%22%2C%22address%22:%22%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; fontsLoaded=1"
      },
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
}
