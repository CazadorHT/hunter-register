"use server";

import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function register(formData: FormData) {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const tel = formData.get("tel");
  const attachment = formData.get("attachment") as File;

  if (!fullname || !email || !tel || !attachment) {
    return { success: false, message: "All fields are required." };
  }

  const filename = uuidv4();
  const supabase = await createClient();

  const { error: uploadError } = await supabase.storage
    .from("attachments")
    .upload(filename, attachment);
  if (uploadError) {
    console.error(uploadError);
    return { success: false, message: "Upload failed." };
  }

  const publicUrl = supabase.storage.from("attachments").getPublicUrl(filename)
    .data.publicUrl;

  const { error: insertError } = await supabase
    .from("users")
    .insert([{ fullname, email, tel, attachment: publicUrl }]);
  if (insertError) {
    console.error(insertError);
    return { success: false, message: "Database insert failed." };
  }

  return { success: true, message: "Registered successfully!" };
}
