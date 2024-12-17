import { getAddStudentRoute, getStudentsRoute } from "@/app/routes";
import { NavMainProps } from "@/components/nav-dropdown";
import { NavUserProps } from "@/components/nav-user";
import { User } from "firebase/auth";
import { GraduationCap } from "lucide-react";

const data = (currentUrl: string): NavMainProps => {
    function isActiveUrl(currentUrl: string, url: string) {
        return currentUrl === url;
    }

    function isOpen(currentUrl: string, url: string) {
        return currentUrl.startsWith(url);
    }

    function createItem(title: string, url: string) {
        return {
            title: title,
            url: url,
            isActive: isActiveUrl(currentUrl, url)
        }
    }

    return {
        navMain: [
            {
                title: "Sistema",
                content: [
                    {
                        title: "Alunos",
                        icon: GraduationCap,
                        isOpen: isOpen(currentUrl, getStudentsRoute()),
                        items: [
                            createItem("Listar alunos", getStudentsRoute()),
                            createItem("Matricular", getAddStudentRoute()),
                        ],
                    }
                ]
            } 
        ]
    }
}

export function getNavUserData(user: User): NavUserProps | null {
    return user && user.displayName ? {
        user: {
            name: user.displayName,
            email: user.email!,
            avatar: user.photoURL || undefined
        }
    } : null;
}

export function getNavMainData(currentUrl: string): NavMainProps {
    return data(currentUrl);
}
