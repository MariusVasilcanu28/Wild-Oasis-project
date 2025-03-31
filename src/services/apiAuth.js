import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data: savedSessionData } = await supabase.auth.getSession();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (savedSessionData) {
    await supabase.auth.setSession(savedSessionData.session);
  }

  // Handle errors
  let authError = null;
  if (user && !user.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }

  if (authError) throw new Error(authError.message);

  return user;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  let { data: sessionData, error } = await supabase.auth.getSession();

  if (!sessionData.session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  return userData?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update password or fullname
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: updateUserError } = await supabase.auth.updateUser(
    updateData
  );
  if (updateUserError) throw new Error(updateUserError.message);

  if (!avatar) return data;

  // Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.floor(
    new Date().valueOf() * Math.random()
  )}`;

  const hasImage = data.user.user_metadata.avatar;
  if (hasImage) {
    const existingFilePath = data.user.user_metadata.avatar.split("/")?.at(-1);

    const { data: imageDeleteData, error: imageDeleteError } =
      await supabase.storage.from("avatars").remove([existingFilePath]);

    if (imageDeleteError) throw new Error(imageDeleteError.message);
  }

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // Update avatar
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
}
