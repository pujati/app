import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
    const { data } = await axios.get("https://liceipujati.edu.it/");
    const $ = cheerio.load(data);

    const articoli = [];

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            const selector = `#maincontent > section:nth-child(${i + 1}) > div:nth-child(2) > div:nth-child(${j + 1}) > div`;
            const article = $(selector);

            const tipo = article.find("h3 > a > span").text().trim();
            const titolo = article.find("h3 > a").text().replace(tipo, "").trim();
            const descrizione = article.find("p").text().trim();
            const immagine = article.find("img").attr("src");
            const href = article.find("h3 > a").attr("href");

            articoli.push({
                tipo: tipo.toLowerCase(),
                titolo,
                descrizione,
                immagine,
                href,
                id: href.split("/")[2]
            });
        }
    }

    res.status(200).json({ articoli });
}