import React from "react";
import LoginForm from "@/components/form/login.form";

const Login = () => {
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%] sm:w-[35%] bg-BgDark/30 rounded-2xl p-5">
          <div className="text-center mt-4">
            <h4 className="text-3xl font-semibold text-shadow">LOGIN</h4>
          </div>
          <LoginForm role="user" />
        </div>
      </div>
    </section>
  );
};

export default Login;
