import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Search } from "../../views/search";

const SearchPage = () => {
  return <Search />;
};

// If the user isn't connected, redirect it to the signin page
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: "/api/auth/signin",
        statusCode: 302
      }
    };
  return {
    props: {} as never
  };
};

export default SearchPage;
