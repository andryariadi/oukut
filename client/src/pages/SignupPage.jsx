import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, UserRound } from "lucide-react";
import { IoMailOutline } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { TbLoader } from "react-icons/tb";
import FloatingShape from "../components/FloatingShape";
import InputField from "../components/InputField";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validators/validations";

const SignupPage = () => {
  const [openPass, setOpenPass] = useState(false);
  const [openConfirmPass, setOpenConfirmPass] = useState(false);

  const { loading, signup } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const dataUsername = { ...register("username") };
  const dataEmail = { ...register("email") };
  const dataPassword = { ...register("password") };
  const dataConfirmPassword = { ...register("confirmPassword") };

  const handleSignup = (data) => {
    signup(data);
  };

  return (
    <div className="relative h-[calc(100vh-5rem)] overflow-hidden flex items-center justify-center">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="p-8 flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Create Account</h2>

          <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-6">
            <div className="bg-ros-500 flex flex-col gap-8">
              <div className="relative">
                <InputField icon={<UserRound size={22} />} type="text" placeholder="Username" propData={dataUsername} />

                {errors.username && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.username.message}</p>}
              </div>

              <div className="relative">
                <InputField icon={<IoMailOutline size={22} />} type="email" placeholder="Email" propData={dataEmail} />

                {errors.email && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <InputField
                  icon={<Lock size={22} />}
                  passIcon={openPass ? <PiEye size={22} /> : <RiEyeCloseFill size={22} />}
                  openPass={openPass}
                  setOpenPass={setOpenPass}
                  type={openPass ? "text" : "password"}
                  placeholder="Password"
                  propData={dataPassword}
                />

                {errors.password && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <InputField
                  icon={<Lock size={22} />}
                  passIcon={openConfirmPass ? <PiEye size={22} /> : <RiEyeCloseFill size={22} />}
                  openPass={openConfirmPass}
                  setOpenPass={setOpenConfirmPass}
                  type={openConfirmPass ? "text" : "password"}
                  placeholder="Confirm Password"
                  propData={dataConfirmPassword}
                />

                {errors.confirmPassword && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <motion.button
              className="py-3 px-4 mt-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Sign Up"}
            </motion.button>
          </form>
        </div>

        <div className="bg-gray-800 bg-opacity-50 px-8 py-4 text-sm">
          <p className="text-center text-gray-400">
            Already have an account?
            <Link to="/login" className="text-green-500 ml-2 inline-block hover:scale-110 transition-all duration-300">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
