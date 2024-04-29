import React from "react";
import { useAuth } from "../utils/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { Space } from "lucide-react";

function Header() {
  const { user, handleUserLogout } = useAuth();
  return (
    <div className="flex justify-between rounded-t-2xl bg-pink-950 px-6 py-4 border">
      {user && (
        <>
          <span className="font-bold text-[1.1rem] uppercase text-zinc-200">
            Welcome {user.name}
          </span>

          <FiLogOut onClick={handleUserLogout} className="text-xl font-bold cursor-pointer hover:text-zinc-100 transition-all" />
        </>
      )}
    </div>
  );
}

export default Header;
