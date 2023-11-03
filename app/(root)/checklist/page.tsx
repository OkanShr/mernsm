import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Termin from "@/components/cards/Termin"
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  

  return (
    <>
      <h1 className='head-text text-left'>Meine Termine</h1>

      <section className='mt-9 flex flex-col gap-10'>
        <Termin
        userId={userInfo._id}
        
        
        />
      </section>

      
    </>
  );
}

export default Page;