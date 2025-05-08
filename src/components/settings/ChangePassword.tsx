import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function ChangePassword() {
  const { t } = useTranslation();
  const { resetPassword } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ChangePasswordFormData>();

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
    const { confirmPassword, ...saveData } = data;
    // Handle password change logic here
    resetPassword(saveData)
    reset();
  };

  const newPassword = watch("newPassword");

  return (
    <div className="flex flex-col gap-5 items-center md:items-start md:flex-row w-full">
      <div className="w-full px-8 sm:px-0 sm:w-2/4">
        <h2 className="text-main-color font-bold text-xl">{t("changePassword.title")}</h2>
        <p className="text-main-color">{t("changePassword.description")}</p>
        <div className="border-t-2 md:hidden border-main-color my-4"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start gap-2 w-full px-8 sm:px-0 sm:w-2/4"
      >
        <div className="flex flex-col w-full gap-1">
          <label className="text-main-color font-semibold">{t("changePassword.current")}</label>
          <input
            type="password"
            placeholder={t("changePassword.placeholder")}
            {...register("currentPassword", {
              required: t("changePassword.errors.currentRequired"),
            })}
            className="px-2 border border-main-color rounded-lg py-2 w-full"
          />
          {errors.currentPassword && (
            <span className="text-red-500 text-sm">{errors.currentPassword.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="text-main-color font-semibold">{t("changePassword.new")}</label>
          <input
            type="password"
            placeholder={t("changePassword.placeholder")}
            {...register("newPassword", {
              required: t("changePassword.errors.newRequired"),
              minLength: {
                value: 8,
                message: t("changePassword.errors.newMin"),
              },
            })}
            className="px-2 border border-main-color rounded-lg py-2 w-full"
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">{errors.newPassword.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="text-main-color font-semibold">{t("changePassword.confirm")}</label>
          <input
            type="password"
            placeholder={t("changePassword.placeholder")}
            {...register("confirmPassword", {
              required: t("changePassword.errors.confirmRequired"),
              validate: (value) =>
                value === newPassword || (t("changePassword.errors.confirmMatch") as string),
            })}
            className="px-2 border border-main-color rounded-lg py-2 w-full"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-main-color rounded-lg text-secondary-color font-bold"
        >
          {t("changePassword.submit")}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
