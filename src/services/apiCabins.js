import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );

  const imageName = `${Math.floor(new Date().valueOf() * Math.random())}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // For Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // For Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be inserted.");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image cound not be uploaded and the cabin was not created."
    );
  }

  console.log(hasImagePath);
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
