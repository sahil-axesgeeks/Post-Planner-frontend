// import MainNavigation from "./main-navigation";
import Profile from "@/Actual-Components/profile/profile";

export default function Navbar() {
  return (
    <header className="flex  items-center justify-between w-full ">
      {/* <div className="font-bold text-lg">My SaaS</div> */}

      {/* THE LEFT SIDE NAVBAR THINGS */}
      <div className="ml-4 ">{/* <MainNavigation /> */}SCHEDULE</div>

      {/* THE RIGHT SIDE NAVBAR THINGS */}
      <Profile></Profile>
    </header>
  );
}
