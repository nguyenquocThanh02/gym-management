"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebases/firebase";
export default function ManagePersonalTrainer() {
  const [urlImage, setUrlImage] = useState("");
  const [file, setFile] = useState("");

  const handleUploadImg = (value) => {
    console.log(value.target.files[0]);
    setFile(value.target.files[0]);
    setUrlImage(URL.createObjectURL(value.target.files[0]));
  };

  const handleSaveImg = async () => {
    try {
      if (urlImage) {
        const storageRef = ref(storage, "images/" + file?.name);
        await uploadBytes(storageRef, file);
        const linkImg = await getDownloadURL(storageRef);
        console.log(linkImg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" onChange={handleUploadImg} />
      </div>
      <img src={urlImage} alt="img" className="w-[240px] h-[240px]" />
      {urlImage && <button onClick={handleSaveImg}>Save</button>}
    </main>
  );
}
