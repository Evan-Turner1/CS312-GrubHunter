import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/button";
import styles from "./index.module.css";

const AuthElement = () => {
  const { data: session, status } = useSession();

  const userId = session?.user?.fdlst_private_userId;
  const userName = session?.user?.name || session?.user?.email || "User";

  return (
    <div className={styles.root}>
      {status === "authenticated" ? (
        <>
          <p className={styles.name}>Hello, {userName}</p>

          <nav>
            {userId && (
              <Button variant="outline">
                <Link href={`/list/${userId}`}>Your Wish List</Link>
              </Button>
            )}
          </nav>

          <Button variant="blue" clickHandler={() => signOut()}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="blue" clickHandler={() => signIn("github", undefined, { prompt: "select_account" })}>
          Sign In
        </Button>
      )}
    </div>
  );
};

export default AuthElement;