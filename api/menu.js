export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const resId = searchParams.get('resId');
    const response = await fetch(
      `https://yumspot-backend.onrender.com/api/menu/${resId}`
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ Error: error.message });
  }
}