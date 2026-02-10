"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar.jsx";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between w-full">
      <div className="ml-4">SCHEDULE</div>

      <Avatar
        className="cursor-pointer border-2 border-black"
        onClick={() => router.push("/Profile")}
      >
        <AvatarImage
          src="https://imgs.search.brave.com/YqZg2uii0QrQ1Rsa2uMBPGip3pinxy5bvqwcFvAzQrk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/c2VuZC1tZS1hLXBp/Yy1vZi11ci1hdmF0/YXItYW5kLXNvbWUt/cmFuZG9tLWltYWdl/LXctYS12MC02ZGZi/ZGNlNjZqemQxLmpw/ZWc_d2lkdGg9ODk1/JmZvcm1hdD1wanBn/JmF1dG89d2VicCZz/PTkyMTlkNjMxMTZi/YTZlODE0ZmQzMWI5/MjFlNzIyZWJmNGJm/YzZhMjA"
          alt="profile"
        ></AvatarImage>
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
    </header>
  );
}
