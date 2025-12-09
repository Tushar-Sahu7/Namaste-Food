export async function GET(req) {
  try {
    const response = await fetch(
      "https://yumspot-backend.onrender.com/api/restaurants"
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.status(500).json({ Error: error.message });
  }
}