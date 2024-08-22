import React from "react";
import LoginForm from "@/components/logic/loginForm.component";

const Login = () => {
  return (
    <section className="h-full p-2 overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%] sm:w-[35%]">
          <div className="text-center mt-4">
            <h4 className="t-1 text-2xl font-semibold text-shadow">LOGIN</h4>
          </div>
          <LoginForm role="user" />
        </div>
      </div>
    </section>
  );
};

export default Login;
