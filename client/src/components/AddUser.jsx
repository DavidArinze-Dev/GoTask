import React, { useState } from "react"; //Dave===========
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import SelectList from "./SelectList";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import {
  useGetTeamListQuery,
  useUpdateUserMutation,
} from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Choices = ["User", "Admin"]; //Dave============

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const userr = "";
  const [stage, setStage] = useState(userr?.stage || Choices[0]); //Dave==========

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isUpdating }] = useUpdateUserMutation();
  const { refetch } = useGetTeamListQuery();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();

        // toast.success(result?.message);
        toast.success("Profile updated successfully");
        if (userData?._id === user > _id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        const inputRole = data.role.toLowerCase(); // Convert input role to lowercase for case-insensitive comparison
        const roleToSend = inputRole === "admin" ? "Admin" : "User";

        await addNewUser({
          ...data,
          password: "qwertyu1",
          role: roleToSend,
          isAdmin: inputRole === "admin",
        }).unwrap();

        refetch();
        toast.success("New User added successfully");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      // toast.error("Something went wrong");
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  // const handleOnSubmit = async (data) => {
  //   try {
  //     if (userData) {
  //       const result = await updateUser(data).unwrap();

  //       // toast.success(result?.message);
  //       toast.success("Profile updated successfully");
  //       if (userData?._id === user > _id) {
  //         dispatch(setCredentials({ ...result.user }));
  //       }
  //     } else {
  //       const inputRole = data.role.toLowerCase(); // Convert input role to lowercase for case-insensitive comparison
  //       const roleToSend = inputRole === "admin" ? "Admin" : "User";

  //       await addNewUser({
  //         ...data,
  //         password: "qwertyu1",
  //         role: roleToSend,
  //       }).unwrap();

  //       refetch();
  //       toast.success("New User added successfully");
  //     }

  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 1500);
  //   } catch (err) {
  //     // toast.error("Something went wrong");
  //     console.log(err);
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-orange-600 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="e.g. John Doe"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded"
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="e.g. Backend Developer"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="e.g. johndoe@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded"
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            {/* <SelectList
              name="role"
              lists={Choices}
              selected={stage}
              setSelected={setStage}
              label="Role"
            /> */}

            <Textbox
              placeholder="e.g. User" //==========David
              type="text"
              name="role"
              label="Role"
              className="w-full rounded"
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-orange-600 px-8 text-sm font-semibold text-white hover:bg-orange-700  sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-bold text-gray-900 hover:text-red-500 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
