import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { fetchThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";

async function PostSearch({
  searchParams,
  communityId,
  communityDetails
}: {
  searchParams: { [key: string]: string | undefined };
  communityId:string;
  communityDetails:string
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchThreads({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <Searchbar routeType={`communities/${communityId}`}/>

      <div className='mt-14 flex flex-col gap-9'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.posts.map((post) => (
              post.community && (
                post.community._id.toString() === communityDetails.toString() && (                
                <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children} 
                threadImage={post.image}              
                />
                )
              
              
            )))}
          </>
        )}
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  )
}

export default PostSearch;