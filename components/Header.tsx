"use client";

import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useLoadAvatar from "@/hooks/useLoadAvatar";
import { UserDetails } from "@/types";
import Input from "@/app/search/components/Input";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const avatarUrl = useLoadAvatar(userDetails);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string>("/images/default-avatar.png");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabaseClient
          .from("users")
          .select("id, avatar_url, first_name, last_name, gender, dateOfBirth")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUserDetails({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            avatar_url: data.avatar_url,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
          });
        }
      }
    };

    fetchUserProfile();
  }, [user, supabaseClient]);

  useEffect(() => {
    if (avatarUrl) {
      setCurrentAvatarUrl(avatarUrl);
    }
  }, [avatarUrl]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };

  return (
    <div className={twMerge("bg-black px-4 py-2 rounded-lg w-full h-full", className)}>
      <div className="w-full flex items-center justify-between">
 
        <div className="hidden md:flex gap-x-0 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-transparent flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={50} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-transparent flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={50} />
          </button>
        </div>

        <div className="flex items-center gap-x-2 justify-center flex-grow mx-2">
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition md:hidden"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <div className="w-full md:w-3/4 lg:w-4/5">
            <Input
              placeholder="Search..."
              className="w-full bg-neutral-300/50 text-black py-2 px-4 rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-2">
          {user ? (
            <div className="flex items-center gap-x-2">
              <Button
                onClick={handleLogout}
                className="bg-white px-2 py-2 text-black rounded-full"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-transparent py-1 rounded-full"
              >
                <img
                  src={currentAvatarUrl}
                  alt="User Avatar"
                  className="h-10 w-10 md:h-10 md:w-10 rounded-full object-cover"
                  onError={() => setCurrentAvatarUrl("/images/default-avatar.png")}
                />
              </Button>
            </div>
          ) : (
            <div className="py-1">
            <Button
              onClick={authModal.onOpen}
              className="bg-white text-black rounded-full px-2 py-2"
            >
              Log In
            </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow h-full">{children}</div>
    </div>
  );
};

export default Header;
