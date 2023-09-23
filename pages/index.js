import { useRef, useState } from "react";
import Link from "next/link";

import { Rerousel } from "rerousel";

export default function Home({ scraped }) {
  const carouselItems = useRef(null);
  const [Data, setData] = useState({
    topPage: scraped.articoli.slice(0, 4),
    articoli: scraped.articoli.slice(4, 8)
  });

  return (<>
    <Rerousel itemRef={carouselItems} interval={7500}>
      {
        Data.topPage.map((a, i) => (
          <div
            key={i}
            ref={carouselItems}
            className="relative"
          >
            <img src={a.immagine} alt={i} className="object-cover h-[25rem] w-screen" />
            <div className="absolute grid inset-0 bg-gradient-to-b from-transparent to-white dark:to-black">
              <div className="mt-auto m-6 text-left">
                <Link
                  href={`/articolo/${a.id}`}
                >
                  <div>
                    <h1 className="text-xl font-black line-clamp-2">
                      {a.titolo}
                    </h1>
                    <p className="text-sm line-clamp-2">
                      {a.descrizione}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))
      }
    </Rerousel>

    <div className="grid gap-y-6 mx-6 mt-6">
      {
        Data.articoli.map((a, i) => (
          <div
            className={`
            bg-black/10 dark:bg-white/10 rounded-lg
            border-2 border-black/10 dark:border-white/10
            flex justify-between items-center px-6 py-4 relative
          `}
          >
            <Link
              href={`/articolo/${a.id}`}
              className="z-20"
            >
              <h1 className="text-xl font-black line-clamp-1">
                {a.titolo}
              </h1>
              <p className="text-sm line-clamp-2">
                {a.descrizione}
              </p>
            </Link>

            <div className="absolute right-0 inset-y-0">
              <img src={a.immagine} alt={i} className="object-cover h-full w-[10rem] rounded-r-md" />
              <div className="bg-gradient-to-l from-[#e5e5e5cc] dark:from-[#1a1a1acc] to-[#e5e5e5] dark:to-[#1a1a1a] z-10 absolute inset-0 rounded-r-md" />
            </div>
          </div>
        ))
      }
    </div>
  </>);
};

export async function getServerSideProps() {
  const data = await fetch(process.env.NEXT_URL + "/api/scrape/home").then(res => res.json());

  return {
    props: {
      scraped: data
    },
  };
}