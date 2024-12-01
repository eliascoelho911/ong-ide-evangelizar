'use client';

import { firebaseConfig } from "@/lib/firebase/config";
import { onAuthStateChanged, signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";

function useUserSession(initialUser: User | null) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState(initialUser);
    const router = useRouter();

    // Register the service worker that sends auth state back to server
    // The service worker is built with npm run build-service-worker
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
            const serviceWorkerUrl = `/auth-service-worker.ts?firebaseConfig=${serializedFirebaseConfig}`

            navigator.serviceWorker
                .register(serviceWorkerUrl)
                .then((registration) => console.log("scope is: ", registration.scope));
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            setUser(authUser)
        })

        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser) => {
            if (user === undefined) return

            // refresh when user changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return user;
}

export default function Header({ initialUser }: { initialUser: User | null }) {

    const user = useUserSession(initialUser);

    const handleSignOut = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        signOut();
    };

    console.log("user", user);

    return (
        <header>
            <Link href="/" className="logo">
                <Image src="/friendly-eats.svg" alt="FriendlyEats" />
                Friendly Eats
            </Link>
            {user ? (
                <>
                    <div className="profile">
                        <p>
                            <Image className="profileImage" src={user.photoURL || "/profile.svg"} alt={user.email || ""} />
                            {user.displayName}
                        </p>

                        <div className="menu">
                            ...
                            <ul>
                                <li>{user.displayName}</li>

                                <li>
                                    <a href="#" onClick={handleSignOut}>
                                        Sign Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <div className="profile"><a href="#">
                    <Image src="/profile.svg" alt="A placeholder user image" />
                    Sign In with Google
                </a></div>
            )}
        </header>
    );
}