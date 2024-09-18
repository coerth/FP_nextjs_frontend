import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center h-full">
             <Logo />
            </div>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="card">
                  <p>Cards</p>
                </Link>
              </li>
              <li>
                <Link href="/set">
                  <p>Sets</p>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <p>Profile</p>
                </Link>
              </li>
            </ul>
            <AuthButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;