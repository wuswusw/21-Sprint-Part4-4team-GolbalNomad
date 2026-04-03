"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/common/Button";
import AlertModal from "@/components/common/modal/alert-modal";
import { useUpdateProfile } from "../hooks/use-update-profile";
import type { MyProfile } from "../types/profile.type";

interface ProfileFormProps {
  initialData: MyProfile;
  isMobile?: boolean;
  onMobileCancel?: () => void;
}

interface ProfileFormValues {
  nickname: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function ProfileForm({
  initialData,
  isMobile = false,
  onMobileCancel,
}: ProfileFormProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    control,
    register,
    handleSubmit,
    getValues,
    trigger,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
    defaultValues: {
      nickname: initialData.nickname,
      email: initialData.email,
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  useEffect(() => {
    reset({
      nickname: initialData.nickname,
      email: initialData.email,
      newPassword: "",
      newPasswordConfirm: "",
    });
  }, [initialData, reset]);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const nickname = useWatch({ control, name: "nickname" });
  const newPassword = useWatch({ control, name: "newPassword" });
  const newPasswordConfirm = useWatch({
    control,
    name: "newPasswordConfirm",
  });

  const isNicknameChanged = nickname !== initialData.nickname;
  const isPasswordChanged = (newPassword ?? "").trim().length > 0;
  const isPasswordMismatch =
    touchedFields.newPasswordConfirm && !!errors.newPasswordConfirm;

  const isSubmitEnabled =
    !isPending &&
    ((isNicknameChanged && !errors.nickname) ||
      (isPasswordChanged &&
        (newPasswordConfirm ?? "").trim().length > 0 &&
        !errors.newPassword &&
        !errors.newPasswordConfirm &&
        isValid));

  const inputClassName = isMobile
    ? "h-[54px] w-[327px] rounded-[16px] border border-[#E0E0E5] bg-white pl-5 pr-12 text-[16px] font-medium text-black shadow-[0_6px_6px_rgba(0,0,0,0.02)] outline-none placeholder:text-[16px] placeholder:font-medium placeholder:text-gray-400"
    : "h-[56px] w-[640px] tablet:w-[420px] desktop:w-[640px] rounded-[16px] border border-[#E0E0E5] bg-white pl-5 pr-12 text-[16px] font-medium text-black shadow-[0_6px_6px_rgba(0,0,0,0.02)] outline-none placeholder:text-[16px] placeholder:font-medium placeholder:text-gray-400";

  const disabledInputClassName = isMobile
    ? "h-[54px] w-[327px] rounded-[16px] border border-[#E0E0E5] bg-[#F7F8FA] pl-5 pr-12 text-[16px] font-medium text-gray-400 shadow-[0_6px_6px_rgba(0,0,0,0.02)] outline-none placeholder:text-[16px] placeholder:font-medium placeholder:text-gray-400 cursor-not-allowed"
    : "h-[56px] w-[640px] tablet:w-[420px] desktop:w-[640px] rounded-[16px] border border-[#E0E0E5] bg-[#F7F8FA] pl-5 pr-12 text-[16px] font-medium text-gray-400 shadow-[0_6px_6px_rgba(0,0,0,0.02)] outline-none placeholder:text-[16px] placeholder:font-medium placeholder:text-gray-400 cursor-not-allowed";

  const errorInputClassName = "border-red-500";
  const labelClassName = "mb-[10px] text-[16px] font-medium text-black";
  const errorClassName =
    "mt-[6px] pl-1 text-[12px] font-medium leading-none text-red-500";

  const onSubmit = async (values: ProfileFormValues) => {
    const payload: {
      nickname?: string;
      profileImageUrl?: string;
      newPassword?: string;
    } = {};

    const nicknameChanged = values.nickname !== initialData.nickname;
    const passwordChanged = values.newPassword.trim().length > 0;

    if (nicknameChanged) payload.nickname = values.nickname;
    if (passwordChanged) payload.newPassword = values.newPassword;

    if (Object.keys(payload).length === 0) {
      openModal("변경된 정보가 없습니다.");
      return;
    }

    try {
      const updatedProfile = await mutateAsync(payload);

      localStorage.setItem("nickname", updatedProfile.nickname);
      localStorage.setItem("profileImage", updatedProfile.profileImageUrl ?? "");
      window.dispatchEvent(new Event("auth-change"));

      let successMessage = "내 정보가 수정되었습니다.";

      if (nicknameChanged && passwordChanged) {
        successMessage = "닉네임과 비밀번호가 수정되었습니다.";
      } else if (nicknameChanged) {
        successMessage = "닉네임이 변경되었습니다.";
      } else if (passwordChanged) {
        successMessage = "비밀번호가 수정되었습니다.";
      }

      reset({
        nickname: updatedProfile.nickname,
        email: updatedProfile.email,
        newPassword: "",
        newPasswordConfirm: "",
      });

      openModal(successMessage);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "내 정보 수정에 실패했습니다.";

      if (message === "UNAUTHORIZED" || message === "Unauthorized") {
        router.push("/login");
        return;
      }

      openModal(message);
    }
  };

  const handleCancel = () => {
    if (isMobile && onMobileCancel) {
      onMobileCancel();
      return;
    }

    reset({
      nickname: initialData.nickname,
      email: initialData.email,
      newPassword: "",
      newPasswordConfirm: "",
    });
  };

  return (
    <>
      <div
        className={
          isMobile
            ? "w-[327px]"
            : "w-[640px] tablet:w-[420px] desktop:w-[640px]"
        }
      >
        <div className={isMobile ? "pt-[35px]" : ""}>
          <h1 className="text-[18px] font-bold leading-none text-black">
            내 정보
          </h1>
          <p className="mt-[8px] text-[14px] font-medium leading-none text-gray-400">
            닉네임과 비밀번호를 수정하실 수 있습니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={isMobile ? "mt-[20px]" : "mt-6"}
        >
          <div
            className={isMobile ? "flex flex-col gap-[18px]" : "flex flex-col gap-6"}
          >
            <Input
              label="닉네임"
              labelClassName={labelClassName}
              errorClassName={errorClassName}
              className={`${inputClassName} ${
                errors.nickname ? errorInputClassName : ""
              }`}
              error={errors.nickname?.message}
              containerClassName="gap-0"
              {...register("nickname", {
                required: "닉네임을 입력해 주세요.",
                maxLength: {
                  value: 10,
                  message: "닉네임은 10자 이하로 작성해주세요.",
                },
              })}
            />

            <Input
              label="이메일"
              labelClassName={labelClassName}
              className={disabledInputClassName}
              containerClassName="gap-0"
              disabled
              {...register("email")}
            />

            <Input
              label="비밀번호"
              labelClassName={labelClassName}
              errorClassName={errorClassName}
              className={`${inputClassName} ${
                errors.newPassword || isPasswordMismatch
                  ? errorInputClassName
                  : ""
              }`}
              error={errors.newPassword?.message}
              containerClassName="gap-0"
              isPassword
              placeholder="8자 이상 입력해 주세요"
              {...register("newPassword", {
                validate: (value) => {
                  if (!value && !getValues("newPasswordConfirm")) return true;
                  if (value.length < 8) {
                    return "비밀번호는 8자 이상 입력해 주세요.";
                  }
                  return true;
                },
                onChange: async () => {
                  if (getValues("newPasswordConfirm")) {
                    await trigger("newPasswordConfirm");
                  }
                },
              })}
            />

            <Input
              label="비밀번호"
              labelClassName={labelClassName}
              errorClassName={errorClassName}
              className={`${inputClassName} ${
                isPasswordMismatch ? errorInputClassName : ""
              }`}
              error={errors.newPasswordConfirm?.message}
              containerClassName="gap-0"
              isPassword
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              {...register("newPasswordConfirm", {
                validate: (value) => {
                  const password = getValues("newPassword");

                  if (!password && !value) return true;
                  if (value !== password) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                  return true;
                },
                onBlur: async () => {
                  await trigger("newPasswordConfirm");
                },
              })}
            />
          </div>

          {isMobile ? (
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex h-[47px] w-[157.5px] items-center justify-center rounded-[12px] border border-[#DDDDDD] bg-white text-[14px] font-semibold text-[#333333]"
              >
                취소하기
              </button>

              <button
                type="submit"
                disabled={!isSubmitEnabled}
                className={`flex h-[47px] w-[157.5px] items-center justify-center rounded-[12px] text-[14px] font-semibold text-white transition-all duration-200 ${
                  isSubmitEnabled
                    ? "bg-[#3D9EF2] hover:bg-[#4488D8]"
                    : "cursor-not-allowed bg-[#C6C8CF]"
                }`}
              >
                저장하기
              </button>
            </div>
          ) : (
            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                variant={isSubmitEnabled ? "primary" : "secondary"}
                rounded="2xl"
                disabled={!isSubmitEnabled}
                className="h-[41px] w-[120px] px-0 py-0 text-[14px] font-bold"
              >
                저장하기
              </Button>
            </div>
          )}
        </form>
      </div>

      {isModalOpen && (
        <AlertModal
          description={modalMessage}
          confirmText="확인"
          onClose={closeModal}
          onConfirm={closeModal}
          size="sm"
        />
      )}
    </>
  );
}