import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  

  return (
    <>
      <h1 className='head-text text-left'>About</h1>

      <section className='mt-9 flex flex-col gap-10'>
        About
      </section>

      
    </>
  );
}

export default Page;