import LoginForm from "@/components/form/login.form";
import React from "react";

const LoginAdmin = () => {
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%] sm:w-[35%] bg-BgDark/30 rounded-2xl">
          <div className="text-center">
            <h4 className="t-1 text-2xl font-semibold text-shadow">
              LOGIN ACCOUNT ADMIN
            </h4>
          </div>
          <LoginForm role="admin" />
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;
