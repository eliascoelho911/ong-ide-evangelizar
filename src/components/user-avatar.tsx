import { PersonStandingIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatar({ avatar, fallback, ...props }: { avatar?: string, fallback?: string } & React.ComponentProps<typeof Avatar>) {
    return (
        <Avatar {...props}>
            {avatar && <AvatarImage src={avatar} />}
            <AvatarFallback>{fallback && fallback || <PersonStandingIcon />}</AvatarFallback>
        </Avatar>
    )
}