import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// ICONS
import { FileUp } from "lucide-react";

export default function Profile() {
  return (
    <>
      <div className="flex m-2 items-center  ">
        {/* NEW POST BUTTON */}
        <Button variant="destructive">
          {" "}
          <FileUp></FileUp> POST
        </Button>

        {/* AVTAR */}
        <Avatar className="rounded-lg ml-2">
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
