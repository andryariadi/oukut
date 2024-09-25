const InputField = ({ icon, passIcon, openPass, setOpenPass, type, propData, ...props }) => {
  return (
    <div className="relative">
      {/* Left icon */}
      <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none text-green-500">{icon}</div>

      {/* Password visibility toggle (for password fields only) */}
      {type === "password" || type === "text" ? (
        <div className="absolute inset-y-0 right-0 px-3 flex items-center text-green-500 cursor-pointer" onClick={() => setOpenPass(!openPass)}>
          {passIcon}
        </div>
      ) : null}

      {/* Input field */}
      <input
        {...propData}
        {...props}
        type={type}
        className={`w-full py-3 ${
          icon ? "pl-11" : "pl-4"
        } pr-11 bg-gray-800 bg-opacity-50 rounded-lg outline-none border border-gray-700 focus:border-green-500 text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300`}
      />
    </div>
  );
};

export default InputField;
