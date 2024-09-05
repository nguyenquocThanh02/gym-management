import React from "react";
import RegisterForm from "@/components/form/register.form";

export default function RegisterFromInvite({
  params,
}: {
  params: { tokenInvite: string };
}) {
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%] bg-BgDark/30 rounded-2xl">
          <div className="block">
            <div className="text-center mt-4">
              <h4 className="text-3xl font-semibold text-shadow">
                REGISTER TRAINEE ACCOUNT
              </h4>
            </div>
            <RegisterForm invite={params?.tokenInvite} />
          </div>
        </div>
      </div>
    </section>
  );
}
