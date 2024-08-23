import React from "react";
import RegisterForm from "@/components/form/register.form";

const Register = () => {
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%]">
          <div className="block">
            <div className="text-center mt-4">
              <h4 className="text-2xl font-semibold text-shadow">REGISTER</h4>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
