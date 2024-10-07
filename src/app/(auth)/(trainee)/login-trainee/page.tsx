import LoginForm from "@/components/form/login.form";
import React from "react";

const LoginTrainee = () => {
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%] sm:w-[35%] bg-BgDark/30 rounded-2xl p-4">
          <div className="text-center">
            <h4 className="t-1 text-3xl font-semibold text-shadow">
              LOGIN ACCOUNT TRAINEE
            </h4>
          </div>
          <LoginForm role="trainee" />
        </div>
      </div>
    </section>
  );
};

export default LoginTrainee;
