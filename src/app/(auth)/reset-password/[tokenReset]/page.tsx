import ResetPasswordForm from "@/components/form/resetPassword.form";
import React from "react";

const ResetPasswordPage = ({ params }: { params: { tokenReset: string } }) => {
  return (
    <section className="h-full overflow-hidden">
      <div className="bg-auth-attachment flex flex-col justify-center items-center">
        <div className="w-[80%] sm:w-[35%] bg-BgDark/30 rounded-2xl p-4">
          <div className="text-center">
            <h4 className="t-1 text-3xl font-semibold text-shadow">
              RESET PASSWORD
            </h4>
          </div>
          <ResetPasswordForm token={params.tokenReset} />
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
