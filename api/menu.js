import fetch from "node-fetch";

export default async function handler(req, res) {
  const { resId, lat, lng } = req.query;

  const resData = await fetch(`https://namaste-food-ashen.vercel.app/api/restaurant?lat=${lat}&lng=${lng}`);
  const json = await resData.json();
  const tid = json?.tid;
  const sid = json?.sid;
  const deviceId = json?.deviceId;

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Firefox/144.0",
        Accept: "*/*",
        "Cookie": `__SW=mwooOs6JBP1L7Bc0CC17NQpgROJ6ZXo0; _device_id=ff4d8ba4-3ece-28d2-5b58-cde3005e1f8b; _guest_tid=9ed02fe3-edeb-4385-96d7-5ea0d475c9ac; _sid=nkn763c4-844d-4e9d-bd94-d8e1d17478ed; userLocation={%22lat%22:%2226.83730%22%2C%22lng%22:%2280.91650%22%2C%22address%22:%22%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; aws-waf-token=121d00f9-7e4e-43e4-8292-d162c72986dd:HgoAcGyHOH8bAAAA:qsXuaEQHQ20JUeknV9A4SweySXWJIXiCrFoQg/zWjJemIQsPU+QAqL0uVm3DXAQmTLuOolk41OfUaptG06bPTgWYkaC00VfYA19XOeak0qUJuI6g3PmDtwbU3TIqYp7xP3kRhOkvSo9UTIs6Mp8I6lLJeEVSCW1AknXP71zwGM/9G/nKAcmsGQGlhnHbQXM=`
      },
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
    res.status(200).json(data);

    if (!response.ok) {
      throw new Error(`Swiggy Menu API returned status ${response.status}`);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
}
