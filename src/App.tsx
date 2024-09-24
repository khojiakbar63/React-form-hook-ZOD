import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.css";

interface formType {
  full_name: string;
  user_name: string;
  // birth_date: date;
  phone_number: string;
  password: string;
}

const formTypeZod = z.object({
  full_name: z
    .string()
    .min(4, "Full name must be at least 4 characters")
    .max(30, "Full name must be 30 maximum.")
    .regex(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/, {
      message:
        "Full name must be 4-30 characters long and can contain letters and spaces. It cannot start or end with a space.",
    }),
  user_name: z
    .string()
    .min(8, "Username must be at least 8 characters")
    .max(20, "Username must be 20 maximum.")
    .regex(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
      message:
        "Username must be 8-20 characters long and can contain letters, numbers, underscores, and periods. It cannot start or end with an underscore or period.",
    }),
  birth_date: z.string().regex(/\d{1,2}(\/|-)\d{1,2}(\/|-)\d{2,4}/, {
    message: "Please enter a valid date in the format DD/MM/YYYY or DD-MM-YYYY",
  }),

  phone_number: z.string().regex(/^\+?998([378]{2}|(9[013-57-9]))\d{7}$/, {
    message: "Please enter a valid phone number ex: +998 XX XXX XX XX",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
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
        {/* Full Name */}
        <div className="relative mb-6">
          <label
            htmlFor="full_name"
            className="flex items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Full name
          </label>
          <input
            {...register("full_name")}
            type="text"
            id="full_name"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Full name..."
            style={errors.full_name?.message ? { border: "1px solid red" } : {}}
          />
          <div className="flex justify-between items-center">
            <div></div>
            <small className="block">{errors.full_name?.message}</small>
          </div>
        </div>
        {/* Username */}
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

        {/* Birth Date */}
        <div className="relative mb-6">
          <label
            htmlFor="birth_date"
            className="flex items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Birth date
          </label>
          <input
            {...register("birth_date")}
            type="date"
            id="birth_date"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Birth date..."
            style={
              errors.birth_date?.message ? { border: "1px solid red" } : {}
            }
          />
          <div className="flex justify-between items-center">
            <div></div>
            <small className="block">{errors.birth_date?.message}</small>
          </div>
        </div>

        {/* Email */}
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
        {/* Password */}
        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="flex  items-center mb-2 text-gray-600 text-sm font-medium"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="text"
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
