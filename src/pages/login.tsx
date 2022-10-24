import authApiRepo from "@/app/api/repositories/auth.api-repo";
import { signInWithGithub, signInWithGoogle } from "@/app/firebase/auth";
import { AppContext } from "@/contexts/AppGlobalContextProvider";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const { currentUserRefetch } = useContext(AppContext);

  const { mutate: mutate__firebaseLogin } = useMutation(
    authApiRepo.firebaseLogin,
    {
      onSuccess: (res) => {
        toast.success("Login successful");
        currentUserRefetch();
        router.push("/");
      },
      onError: (error: AxiosError) => {
        console.log(error);
        toast.error("Failed to login");
      },
    }
  );

  const handleLoginWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        // @ts-ignore
        const idToken = result?._tokenResponse?.idToken;
        mutate__firebaseLogin(idToken);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const handleLoginWithGithub = () => {
    signInWithGithub()
      .then((result) => {
        // @ts-ignore
        const idToken = result?._tokenResponse?.idToken;
        mutate__firebaseLogin(idToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold">Login to your account</h1>
      <div className="flex flex-col gap-4">
        <Button size="large" onClick={handleLoginWithGoogle}>
          Login with Google
        </Button>
        <Button size="large" onClick={handleLoginWithGithub}>
          Login with Github
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
