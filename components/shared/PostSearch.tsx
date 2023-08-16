// import { redirect } from "next/navigation";
// import { currentUser } from "@clerk/nextjs";

// import UserCard from "@/components/cards/UserCard";
// import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";

// import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
// import { fetchThreads } from "@/lib/actions/thread.actions";
// import ThreadCard from "../cards/ThreadCard";

// async function PostSearch({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | undefined };
// }) {
//   const user = await currentUser();
//   if (!user) return null;

//   const userInfo = await fetchUser(user.id);
//   if (!userInfo?.onboarded) redirect("/onboarding");

//   const result = await fetchThreads({
//     userId: user.id,
//     searchString: searchParams.q,
//     pageNumber: searchParams?.page ? +searchParams.page : 1,
//     pageSize: 25,
//   });

//   return (
//     <section>
//       <h1 className='head-text mb-10'>Search</h1>

//       <Searchbar routeType='search' />

//       <div className='mt-14 flex flex-col gap-9'>
//         {result.posts.length === 0 ? (
//           <p className='no-result'>No Result</p>
//         ) : (
//           <>
//             {result.posts.map((post) => (
//               <ThreadCard
//               key={post._id}
//               id={post._id}
//               currentUserId={user.id}
//               parentId={post.parentId}
//               content={post.text}
//               author={post.author}
//               community={post.community}
//               createdAt={post.createdAt}
//               comments={post.children}
//               isComment threadImage={post.image}           />
//             ))}
//           </>
//         )}
//       </div>

//       {/* <Pagination
//         path='search'
//         pageNumber={searchParams?.page ? +searchParams.page : 1}
//         isNext={result.isNext}
//       /> */}
//     </section>
//   )
// }

// export default PostSearch;