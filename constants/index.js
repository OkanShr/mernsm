export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/searchuser.svg",
    route: "/searchuser",
    label: "Search User",
  },
  {
    imgURL: "/assets/filesearch.svg",
    route: "/searchposts",
    label: "Search Posts",
  },
  // {
  //   imgURL: "/assets/heart.svg",
  //   route: "/activity",
  //   label: "Activity",
  // },
  {
    imgURL: "/assets/create.svg",
    route: "/create-post",
    label: "Create Post",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "My Organizations",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "posts", label: "Posts", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "posts", label: "Posts", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "searchpost", label: "Search Post", icon: "/assets/filesearch-gray.svg" },
];