"use server";

import { createClient } from "@/lib/supabase/server";
import {v4 as uuidv4} from "uuid"

export async function register(formData: FormData): Promise<void> {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const tel = formData.get("tel");
  const attachment = formData.get("attachment") as File;
 const filename =uuidv4()
  const supabase = await createClient();
  // Create Supabase client
  const { error } = await supabase.storage
    .from("attachments")
    .upload(filename, attachment);
    if (error) {
      console.error("found some error", error);
      return;
    }
    const publicAttachmentURL= supabase.storage.from('attachments').getPublicUrl(filename)

    console.log("Upload successfull! name: ",publicAttachmentURL)
    console.log("success");
  const { data, error:errorinsert } = await supabase
    .from("users")
    .insert([{ fullname, email, tel ,attachment:publicAttachmentURL.data.publicUrl}]);

  if (errorinsert) {
    console.error("found some error", errorinsert);
    // อาจจะ throw error ไปเลย ถ้าอยาก redirect ไปหน้าผิดพลาด
    // throw new Error("Register failed");
    return; // ✅ แค่ return เฉยๆ ไม่ต้องคืน false
  }

  console.log(fullname, email, tel);
  return; // ✅ ชัดเจนว่าเป็น void
}
