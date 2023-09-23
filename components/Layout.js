import { useState } from "react";

import Link from "next/link";
import { Inter } from "next/font/google"

import {
    HomeIcon as HomeIconInactive,
    UserIcon as UserIconInactive,
    EnvelopeIcon as EnvelopeIconInactive,
    CalendarIcon as CalendarIconInactive,
} from "@heroicons/react/24/outline";

import {
    HomeIcon as HomeIconActive,
    UserIcon as UserIconActive,
    EnvelopeIcon as EnvelopeIconActive,
    CalendarIcon as CalendarIconActive,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Icon from "@/assets/Icon";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
    children,
}) {
    const router = useRouter();

    const [FooterTabs, setFooterTabs] = useState([
        {
            name: "Home",
            href: "/",
            iconInactive: HomeIconInactive,
            iconActive: HomeIconActive,
        },
        {
            name: "Circolari",
            href: "/circolari",
            iconInactive: EnvelopeIconInactive,
            iconActive: EnvelopeIconActive,
        },
        {
            name: "Calendario",
            href: "/calendario",
            iconInactive: CalendarIconInactive,
            iconActive: CalendarIconActive,
        },
        {
            name: "Per te",
            href: "/you",
            iconInactive: UserIconInactive,
            iconActive: UserIconActive,
        },
    ]);
    const [AlternativeHeader, setAlternativeHeader] = useState([
        "/",
        "/articolo/[id]"
    ]);

    return (<>
        <header
            className={`
                ${AlternativeHeader.includes(router.pathname) ?
                    "fixed top-0 inset-x-0"
                    : "sticky top-0 bg-[#e5e5e5] dark:bg-[#1a1a1a] border-b-2 border-black/10 dark:border-white/10"
                }
                flex justify-center items-center py-4 px-6 z-50
                ${inter.className}
            `}
        >
            <Icon className="w-12 h-12 fill-current z-[51]" />

            {
                AlternativeHeader.includes(router.pathname) &&
                <div
                    className={`
                        absolute h-[200%] w-full bg-gradient-to-b from-white to-transparent dark:from-black dark:to-transparent
                        pointer-events-none
                    `}
                />
            }
        </header>

        <main
            className={`
                mb-auto ${!AlternativeHeader.includes(router.pathname) ? "px-6 py-10" : "pb-4"}
                ${inter.className}
            `}
        >
            {children}
        </main>

        <footer
            className={`
                sticky bottom-0 bg-[#e5e5e5] dark:bg-[#1a1a1a] border-t-2 border-black/10 dark:border-white/10
                flex justify-between divide-x-2 divide-black/10 dark:divide-white/10 z-50
                ${inter.className}
            `}
        >
            {
                FooterTabs.map((tab, index) => (
                    <Link
                        key={index}
                        href={tab.href}
                        className="px-6 py-4 w-full justify-center items-center flex flex-col"
                    >
                        {
                            router.pathname === tab.href ?
                                <tab.iconActive className="w-6 h-6" /> :
                                <tab.iconInactive className="w-6 h-6" />
                        }
                    </Link>
                ))
            }
        </footer>
    </>);
};