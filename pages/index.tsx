import React from "react";
import { useCurrentUser } from "@lib/context";
import { signOut } from "next-auth/react";

export default function Home() {
  const authUser = useCurrentUser();
  return (
    <>
      {authUser && (
        <div className="mt-8 text-center flex flex-col items-center w-full">
          <h1 className="text-2xl text-gray-800">Hello World!</h1>
          <button onClick={() => signOut()}>logout</button>
        </div>
      )}
    </>
  );
}
