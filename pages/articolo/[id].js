import { useRef, useState } from "react";
import Link from "next/link";

import { Rerousel } from "rerousel";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Home({ title, body, image, views, allegati }) {
    return (<>
        <div className="relative">
            <img src={image} alt={title} className="object-cover h-[25rem] w-screen" />
            <div className="absolute grid inset-0 bg-gradient-to-b from-transparent to-white dark:to-black">
                <div className="mt-auto m-6 text-left">
                    <h1 className="text-xl font-black line-clamp-2">
                        {title}
                    </h1>
                </div>
            </div>
        </div>

        <div
            className="mx-6 text-left prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: body }}
        />

        <div
            className="mx-6 mt-0 text-left prose dark:prose-invert"
        >
            {
                allegati && allegati.length > 0 && (<>
                    <p className="text-xl font-bold mb-4">
                        {allegati.length} allegat{allegati.length === 1 ? "o" : "i"}
                    </p>

                    <div className="grid gap-4">
                        {
                            allegati.map((a, i) => (
                                <Link
                                    href={"https://liceipujati.edu.it/" + a.href}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    key={i}
                                    className={`
                                        bg-[#e5e5e5] dark:bg-[#1a1a1a] border-2 border-black/10 dark:border-white/10
                                        flex justify-between items-center px-6 py-4 relative rounded-md
                                    `}
                                >
                                    <p className="m-0 line-clamp-2 leading-6 no-underline">
                                        {a.nome}
                                    </p>

                                    <ArrowDownIcon className="w-6 h-6 ml-8" strokeWidth={3} />
                                </Link>
                            ))
                        }
                    </div>
                </>)
            }
        </div>
    </>);
};

export async function getServerSideProps(ctx) {
    const data = await fetch(process.env.NEXT_URL + "/api/scrape/article/" + ctx.params.id).then(res => res.json());

    return {
        props: data,
    };
}