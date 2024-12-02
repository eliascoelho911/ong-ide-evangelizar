import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, getIdToken, Auth } from "firebase/auth";
import { getInstallations, getToken, Installations } from "firebase/installations";

let firebaseConfig: Record<string, string>;

self.addEventListener('install', () => {
    // extract firebase config from query string
    const serializedFirebaseConfig = new URL(location.href).searchParams.get('firebaseConfig');

    if (!serializedFirebaseConfig) {
        throw new Error('Firebase Config object not found in service worker query string.');
    }

    firebaseConfig = JSON.parse(serializedFirebaseConfig);
    console.log("Service worker installed with Firebase config", firebaseConfig);
});

self.addEventListener("fetch", (event: Event) => {
    const fetchEvent = event as FetchEvent; 
    const { origin } = new URL(fetchEvent.request.url);
    if (origin !== self.location.origin) return;
    fetchEvent.respondWith(fetchWithFirebaseHeaders(fetchEvent.request));
});

async function fetchWithFirebaseHeaders(request: Request): Promise<Response> {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const auth: Auth = getAuth(app);
    const installations: Installations = getInstallations(app);
    const headers = new Headers(request.headers);

    const [authIdToken, installationToken] = await Promise.all([
        getAuthIdToken(auth),
        getToken(installations),
    ]);

    if (installationToken) {
        headers.append("Firebase-Instance-ID-Token", installationToken);
    }

    if (authIdToken) {
        headers.append("Authorization", `Bearer ${authIdToken}`);
    }

    const newRequest = new Request(request, { headers });
    return await fetch(newRequest);
}

async function getAuthIdToken(auth: Auth): Promise<string | undefined> {
    await auth.authStateReady(); 
    if (!auth.currentUser) return undefined;
    return await getIdToken(auth.currentUser);
}
