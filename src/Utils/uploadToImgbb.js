export async function uploadToImgbb(imageFile) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_IMGBB_API_KEY missing in frontend .env");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data?.success) {
    throw new Error(data?.error?.message || "Image upload failed");
  }

  return data.data.url; // direct image url
}
