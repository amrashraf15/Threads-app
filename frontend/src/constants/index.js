import {
  Home,
  Search,
  Heart,
  PlusSquare,
  Users,
  User,
} from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Search, 
    route: "/search",
    label: "Search",
  },
  {
    icon: Heart,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: PlusSquare,
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    icon: User,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];