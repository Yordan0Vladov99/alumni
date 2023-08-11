import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import "./GroupForm.css";
import { Member } from "../../../Dtos/Member";
import ErrorSymbol from "../../../ErrorSymbol/ErrorSymbol";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface GroupProps {
  subgroups: Member[];
}
function GroupForm({ subgroups }: GroupProps) {
  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "Name cannot be empty." })
      .refine(
        (name) => !subgroups.some((subgroup) => subgroup.name === name),
        "Name already exists."
      ),
    image: z
      .any()
      .refine(
        (file: FileList) => (file?.item(0)?.size as number) <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.item(0).type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )

      .optional(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="FormContent">
      <button onClick={() => setOpenForm(true)}>Add Group</button>
      <div className={`formContainer ${openForm ? "active" : ""}`}>
        <div>
          <img
            onClick={() => setOpenForm(false)}
            src="/images/icon-menu-close-light.svg"
            alt="close"
          />
          <form
            action=""
            className="GroupForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className={`input-container ${
                errors.name?.message ? "invalid" : ""
              }`}
            >
              <input placeholder="First Name" {...register("name")} />
              <ErrorSymbol />
            </div>
            <p className="error-msg">{errors.name?.message?.toString()}</p>

            <div
              className={`input-container ${
                errors.image?.message ? "invalid" : ""
              }`}
            >
              <input type="file" placeholder="File" {...register("image")} />
              <ErrorSymbol />
            </div>
            <p className="error-msg">{errors.image?.message?.toString()}</p>

            <input type="submit" value="Create Group" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default GroupForm;
