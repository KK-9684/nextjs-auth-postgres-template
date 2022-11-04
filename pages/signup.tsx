import React, { useState } from "react";
import Router from "next/router";
import { useUser } from "@zenstackhq/runtime/hooks";
import { signIn } from "next-auth/react";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { create: signup } = useUser();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signup({
        data: {
          email,
          name,
          password,
        },
      });

      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (signInResult?.ok) {
        await Router.push("/");
      } else {
        console.error("Signin failed:", signInResult?.error);
      }
    } catch (error) {
      console.error(error);
      alert("This email has been registered");
    }
  };

  return (
    <>
      <div className="page">
        <form onSubmit={submitData}>
          <h1>Signup user</h1>
          <input autoFocus onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" value={name} />
          <input onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="text" value={email} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
            value={password}
          />
          <input disabled={!name || !email || !password} type="submit" value="Signup" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
        <p>
          Already have an account?{" "}
          <a
            className="signin"
            onClick={() =>
              signIn(undefined, {
                callbackUrl: "/",
              })
            }
          >
            Signin now
          </a>
          .
        </p>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
          cursor: pointer;
        }
        .signin {
          cursor: pointer;
          text-decoration: underline;
        }
        .back {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default SignUp;
