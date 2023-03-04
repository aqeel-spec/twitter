import React from "react";
// import { getProviders, signIn ,  } from "next-auth/react";
import { Provider } from "next-auth/providers";
import { GetServerSideProps } from "next/types";
import Logo from "../../public/twitter_logo.svg";
import Image from "next/image";
import GIcon from "../../public/google.svg";
// here is types of athentiation
import { getProviders, signIn } from "next-auth/react";
import TLogo from "@/components/icons/tLogo";
import AppleLogo from "@/components/icons/aLogo";
interface SignInProps {
  providers: Record<string, Provider>;
}

export default function Signin({ providers }: SignInProps) {
  const myLoader = ({
    src,
    width,
    height,
  }: {
    src: string;
    width: number;
    height: number;
  }) => {
    return `/${src}?w=${width}&h=${height}`;
  };
  return (
    <>
      <div className=" flex flex-col-reverse lg:flex-row  relative">
        <div className="flex relative text-center items-center justify-center">
          <img
            src={
              "https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png"
            }
            alt="twitter bg Image"
            className=" h-screen w-full"
          />
          {/* <div className=""></div> */}
          <div className="h-60 w-60  z-50 items-center absolute  text-white text-center justify-center">
            <TLogo />
          </div>
        </div>
        <div className="   max-w-[600px] min-w-[45vw] p-5">
          <div className="  m-0 p-0 relative box-border ">
            <img
              src={"/twitter_logo.svg"}
              alt=""
              height={50}
              width={50}
              className="text-white"
            />
            <div className="lg:text-7xl sm:text-5xl text-6xl font-extrabold text-[#0F1419] py-10">
              Happening now
            </div>
            <div className="text-[#0F1419] font-semibold lg:text-3xl text-2xl py-6 px-2">
              Join Twitter today.
            </div>
            <div className="px-4">
              <div className=" ">
                {Object.values(providers).map((provider) => (
                  <div className="">
                    <div
                      key={provider.id}
                      className=" items-center border-2 border-gray-100 cursor-pointer z-50 px-12 py-2 w-fit rounded-full hover:bg-sky-100"
                    >
                      <button
                        onClick={() =>
                          signIn(provider.id, { callbackUrl: "/" })
                        }
                        className=" rounded-lg  flex items-center justify-center gap-3 text-gray-500"
                      >
                        <Image
                          src={GIcon}
                          alt=""
                          height={15}
                          width={15}
                          className=""
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                    <div className="py-4">
                      <div
                        key={provider.id}
                        className=" items-center  border-2  cursor-pointer z-50 px-12 py-2 w-fit rounded-full hover:bg-gray-100"
                      >
                        <button
                          onClick={() => {
                            window.alert(
                              `Sorry!, for inconvenience we have not yet added Apple functionailty . \n You can continue with Google. `
                            );
                            signIn(provider.id, { callbackUrl: "/" });
                          }}
                          className=" rounded-lg font-[18.51px] flex items-center justify-center gap-3 text-[#0F1419]"
                        >
                          <span className="h-5 w-5">
                            <AppleLogo />
                          </span>
                          Sign in with Apple
                        </button>
                      </div>
                    </div>
                    <div className="pb-2 w-auto sm:w-[50%] text-center ">
                      <p className="">or</p>
                    </div>
                    <div className="bg-sky-500/75 hover:bg-sky-500/100 w-auto sm:w-[56%] rounded-full">
                      <button className="text-center  w-full py-2 px-8 rounded-full text-white font-bold">
                        Create account
                      </button>
                    </div>
                    <p className="text-[10px] text-[#536571] w-auto sm:w-[56%] pt-1">
                      By signing up, you agree to the{" "}
                      <a
                        href="https://twitter.com/en/tos"
                        className="hover:underline underline-offset-2 text-[#1D9BF0]"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://twitter.com/en/privacy"
                        className="hover:underline underline-offset-2 text-[#1D9BF0]"
                      >
                        Privacy Policy
                      </a>
                      , including{" "}
                      <a
                        href="https://twitter.com/en/privacy"
                        className="hover:underline underline-offset-2 text-[#1D9BF0]"
                      >
                        Cookie Use.
                      </a>
                    </p>
                    <div className="pt-12">
                      <p className="font-bold pb-4">Already have an account?</p>
                      <div
                        className=" hover:bg-sky-100  w-auto sm:w-[56%] rounded-full border-[0.9px] border-gray-200 "
                        key={provider.id}
                      >
                        <button
                          className="text-center  w-full py-2 px-8 rounded-full text-[#1D9BF0] font-semibold"
                          onClick={() =>
                            signIn(provider.id, { callbackUrl: "/" })
                          }
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center mt-20 space-x-4">
        <img
          className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6 "
          src="https://www.techbooky.com/wp-content/uploads/2021/07/4859E08D-388B-4475-9FCC-C05914CC654A.png"
          alt="twitter images inside phone"
        />
        <div className=" ">
          {Object.values(providers).map((provider) => (
            <div key={provider.id} className="flex flex-col items-center">
              <img
                className="w-36 object-cover "
                src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
                alt=""
              />
              <p className="text-center text-sm italic my-10 ">
                This app is created for leaning perposes
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 "
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
