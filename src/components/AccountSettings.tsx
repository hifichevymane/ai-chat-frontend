import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { RootState } from "../store";
import { UserState } from "../store/user/user-slice";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onEdit?: (data: Pick<UserState, 'firstName' | 'lastName'>) => void;
  onLogout?: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AccountSettings({ isOpen, onClose, onEdit, onLogout }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, [user, reset]);

  const onSubmit = (data: FormSchema) => {
    setEditMode(false);
    onEdit?.(data);
  };

  const onCancel = () => {
    setEditMode(false);
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-primary-100 rounded-2xl shadow-md px-8 py-10 w-full max-w-sm flex flex-col gap-6">
        <header className="mb-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-secondary text-primary-600 mb-1">Account Settings</h1>
          <button
            aria-label="Close"
            className="bg-transparent border-0 text-2xl cursor-pointer hover:text-red-500 transition-colors"
            onClick={onClose}
            type="button"
          >
            &times;
          </button>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm">
            First Name
            <input
              type="text"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("firstName", { disabled: !editMode })}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </label>
          <label className="flex flex-col gap-1 font-secondary text-primary-500 text-sm">
            Last Name
            <input
              type="text"
              className="bg-primary-000 border border-primary-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 transition"
              {...register("lastName", { disabled: !editMode })}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </label>
          {!editMode && (
            <button
              type="button"
              className="mt-2 w-full h-12 rounded-lg font-primary text-base font-semibold transition-colors duration-150 bg-primary-600 text-primary-000 hover:bg-primary-500"
              onClick={() => setEditMode(true)}
            >
              Edit Account
            </button>
          )}
          {editMode && (
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="w-full h-12 rounded-lg font-primary text-base font-semibold transition-colors duration-150 bg-primary-600 text-primary-000 hover:bg-primary-500"
              >
                Apply
              </button>
              <button
                type="button"
                className="w-full h-12 rounded-lg font-primary text-base font-semibold transition-colors duration-150 bg-primary-300 text-primary-600 hover:bg-primary-200"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
        <button
          type="button"
          className="flex items-center gap-2 mt-4 w-full h-12 rounded-lg font-primary text-base font-semibold transition-colors duration-150 bg-red-100 text-red-600 hover:bg-red-200 justify-center border border-red-200"
          onClick={onLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m6 0l-3-3m3 3l-3 3" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}
