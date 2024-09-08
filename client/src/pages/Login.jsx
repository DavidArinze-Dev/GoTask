import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAddTask } from "react-icons/md";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  // const user = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();

      dispatch(setCredentials(result));
      navigate("/");

      // Reload the page
      window.location.reload();
      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side */}

        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center mt-5">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <p className="bg-orange-600 p-3 rounded-full">
              <MdOutlineAddTask className="text-white text-5xl " />
            </p>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-orange-500 hover:text-orange-600 cursor-default">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>
            <span className="flex gap-1 py-1 px-3 border border-orange-300 hover:border-orange-600 rounded-full text-sm md:text-base text-gray-500 hover:text-gray-600 cursor-default">
              Manage all your task in one place!
            </span>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center glow">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 px-10 pt-14 pb-14 "
          >
            <div className="">
              <p className="text-orange-500 hover:text-orange-600 text-3xl font-bold text-center cursor-default">
                Welcome back!
              </p>
              <p className="text-center text-base text-gray-400 ">
                Keep all your credentials safe.
              </p>
            </div>

            <div className="flex flex-col gap-y-5 ">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full hover:border-orange-300"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full hover:border-orange-300"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </span>

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Submit"
                  className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white hover:text-black rounded-full"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
