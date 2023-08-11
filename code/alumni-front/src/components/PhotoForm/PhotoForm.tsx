import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorSymbol from "../ErrorSymbol/ErrorSymbol";
import { useState } from "react";
import "./PhotoForm.css";
import { Photo } from "../Dtos/Photo";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

function PhotoForm(props: {
  group: string | undefined;
  update: (photo: Photo) => void;
}) {
  const schema = z.object({
    image: z
      .any()
      .refine(
        (file: FileList) => (file?.item(0)?.size as number) <= MAX_FILE_SIZE,
        `Max image size is 5MB. Your image was`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.item(0).type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("group", props.group || "");
    formData.append("file", data.image[0]);
    formData.append("token", localStorage.getItem("token") || "");
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch("/api/photos/upload", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        props.update(res);
        setOpenForm(false);
      })
      .catch((error) => console.error(error));
  };

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="FormContent">
      <img src="/images/upload.svg" onClick={() => setOpenForm(true)} alt="" />
      <div className={`photoFormContainer ${openForm ? "active" : ""}`}>
        <div>
          <img
            onClick={() => setOpenForm(false)}
            src="/images/icon-menu-close.svg"
            alt="close"
          />
          <form
            action=""
            className="PhotoForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className={`input-container ${
                errors.image?.message ? "invalid" : ""
              }`}
            >
              <input type="file" placeholder="File" {...register("image")} />
              <ErrorSymbol />
            </div>
            <p className="error-msg">{errors.image?.message?.toString()}</p>

            <input type="submit" value="Upload" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PhotoForm;
