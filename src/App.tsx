import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.css";

interface formType {
  user_name: string;
  phone_number: string;
  password: string;
}

const formTypeZod = z.object({
  user_name: z
    .string()
    .min(8, "Username must be at least 8 characters")
    .max(20, "Username must be 20 maximum.")
    .regex(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
      message:
        "Username must be 8-20 characters long and can contain letters, numbers, underscores, and periods. It cannot start or end with an underscore or period.",
    }),
  phone_number: z.string().regex(/^\+?998([378]{2}|(9[013-57-9]))\d{7}$/, {
    message: "Please enter a valid phone number ex: +998 XX XXX XX XX",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});

type SignUpSchemaType = z.infer<typeof formTypeZod>;

const App: React.FC = () => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(formTypeZod),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const submit: SubmitHandler<formType> = (data) => {
    console.log(data);
    console.log("Submitted");
  };
  console.log(errors);
  console.log("w=>", watch("user_name"));

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="lg:p-16 p-6 w-[600px] mx-auto  shadow"
      >
        <div className="relative mb-6">
          <label
            htmlFor="user_name"
            className="flex items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Username
          </label>
          <input
            {...register("user_name")}
            type="text"
            id="user_name"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Username..."
            style={errors.user_name?.message ? { border: "1px solid red" } : {}}
          />
          <div className="flex justify-between items-center">
            <div></div>
            <small className="block">{errors.user_name?.message}</small>
          </div>
        </div>

        <div className="relative mb-6">
          <label
            htmlFor="phone_number"
            className="flex  items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Phone number
          </label>
          <input
            {...register("phone_number")}
            type="text"
            id="phone_number"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Phone number..."
            style={
              errors.phone_number?.message ? { border: "1px solid red" } : {}
            }
          />
          <div className="flex justify-between items-center">
            <div></div>
            <small className="block">{errors.phone_number?.message}</small>
          </div>
        </div>

        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="flex  items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="**********"
            style={errors.password?.message ? { border: "1px solid red" } : {}}
          />
          <div className="flex justify-between items-center">
            <div></div>
            <small className="block">{errors.password?.message}</small>
          </div>
        </div>

        <button
          type="submit"
          className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default App;
