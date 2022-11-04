import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { status, data } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "unauthenticated") {
    signIn();
    return <></>;
  } else {
    const authUser = data?.user;
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
}
