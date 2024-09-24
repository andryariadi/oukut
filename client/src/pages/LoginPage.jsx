import { motion } from "framer-motion";
import { useState } from "react";
import { Lock } from "lucide-react";
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
import { loginSchema } from "../validators/validations";

const LoginPage = () => {
  const [openPass, setOpenPass] = useState(false);
  const { login, loading } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dataEmail = { ...register("email") };
  const dataPassword = { ...register("password") };

  const handleLogin = (data) => {
    login(data);
  };

  console.log(isSubmitting, "<---diloginpage");

  return (
    <div className="relative h-[calc(100vh-5rem)] overflow-hidden flex items-center justify-center">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="p-8 flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Welcome Back</h2>

          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">
            <div className="bg-ros-500 flex flex-col gap-9">
              <div className="relative">
                <InputField icon={<IoMailOutline size={22} />} type="email" placeholder="Email" propData={dataEmail} />

                {errors.email && <p className="text-red-500 text-sm absolute -bottom-6">{errors.email.message}</p>}
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

                {errors.password && <p className="text-red-500 text-sm absolute -bottom-6">{errors.password.message}</p>}
              </div>
            </div>

            <div className="mt-3">
              <Link to="" className="text-green-500 text-sm inline-block hover:scale-105 transition-all duration-300">
                Forgot Password?
              </Link>
            </div>

            <motion.button
              className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Login"}
            </motion.button>
          </form>
        </div>

        <div className="bg-gray-800 bg-opacity-50 px-8 py-4 text-sm">
          <p className="text-center text-gray-400">
            Don't have an account?
            <Link to="/signup" className="text-green-500 ml-2 inline-block hover:scale-110 transition-all duration-300">
              Signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
