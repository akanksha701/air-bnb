"use client";
import React, { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import MenuItem from "@/app/components/navbar/Menuitem";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent= ()=>
  {
    if(!currentUser)
    {
      loginModal.onOpen();
    }
    else
    {
      rentModal.onOpen();
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div 
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 rounded-full p-4 md:py-1 border-[1px] hover:shadow-md cursor-pointer"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={null} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  onClick={() => router.push('/trips')}
                  label="My trips" 
                />
                <MenuItem 
                  onClick={() => router.push('/favourites')}
                  label="My favorites" 
                />
                <MenuItem 
                    onClick={() => router.push('/reservations')}
                  label="My reservations" 
                />
                <MenuItem 
                  onClick={() => router.push('/properties')}
                  label="My properties" 
                />
                <MenuItem 
                  onClick={rentModal.onOpen}
                  label="Airbnb my home" 
                />
                <hr />
                <MenuItem 
                  onClick={() => signOut()}
                  label="Logout" 
                />
              </>
            ) : (
              <>
                <MenuItem 
                  onClick={loginModal.onOpen}
                  label="Login" 
                />
                <MenuItem 
                  onClick={registerModal.onOpen}
                  label="Sign up" 
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
