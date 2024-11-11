"use client";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../navbar/Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Buttons from "../navbar/Buttons";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
const RegisterModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created successfully");
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const openLogin= ()=>
    {
      registerModal.onClose();
      loginModal.onOpen();
    }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Buttons
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <Buttons
        outline
        label="Continue with Github"
        Icon={AiFillGithub}
        onClick={()=> { signIn("github")}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={()=>{openLogin()}}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Sign up"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
