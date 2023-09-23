import { useState } from "react";

export default function Circolari({ scraped }) {
  const [Circolari, setCircolari] = useState([
    ...scraped
  ]);

  return (<>
    <div className="grid gap-y-6 mx-6">
      <h1 className="text-2xl font-bold">
        Circolari
      </h1>

      {
        Circolari.map((a, i) => (
          <div
            className={`
              bg-black/10 dark:bg-white/10 rounded-lg
              border-2 border-black/10 dark:border-white/10
              px-6 py-4 relative
            `}
          >
            <h1 className="font-bold">
              {a.descrizione}
            </h1>
            <p className="text-sm mt-2">
              <b>Pubblicato il</b>: {new Date(a.pubblicato).toLocaleDateString("it-IT")}
              <br />
              <b>Pubblicato per</b>: {a.tipologia.join(", ")}
            </p>
          </div>
        ))
      }
    </div>
  </>);
};

export async function getStaticProps() {
  const data = await fetch(process.env.NEXT_URL + "/api/scrape/circolari").then(res => res.json());

  return {
    props: {
      scraped: data.circolari
    },
  };
}