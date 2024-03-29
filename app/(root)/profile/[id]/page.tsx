import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";


async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.name}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value}>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Posts" }
              </TabsTrigger>
            ))}
          </TabsList>
          
            <TabsContent key={`content-posts`} value="posts" className="w-full text-light-1">
                
                
                <ThreadsTab
                page={"profile"}
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
                />
            </TabsContent>

            <TabsContent key={`content-replies`} value="replies" className="w-full text-light-1">
                
                
            <h1>Soon...</h1>

            </TabsContent>

            <TabsContent key={`content-tagged`} value="tagged" className="w-full text-light-1">
                
                
                <h1>Soon...</h1>
            </TabsContent>
            
          
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
