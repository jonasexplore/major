import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Olá {user?.name}! Bem vindo de volta.</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
