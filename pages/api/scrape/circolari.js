import axios from "axios";
import cheerio from "cheerio";

const getAllegati = ($, el) => {
    const allegati = [];

    $(el).find(".box-allegato-new").each((i, el) => {
        const href = $(el).find("a").attr("href");
        const nome = $(el).find(".box-allegato-titolo").text().trim();

        if (href && nome) allegati.push({ href, nome });
    });

    $(el).find(".box-allegato").each((i, el) => {
        const href = $(el).find("a").attr("href");
        const nome = $(el).find("span").text().trim();

        if (href && nome) allegati.push({ href, nome });
    });

    return allegati;
};

export default async function handler(req, res) {
    const { page } = req.query;

    const { data } = await axios.get(`https://liceipujati.edu.it/comunicati?tipo=comunicati&cerca=&page=${page || 1}&categoria=&storico=`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Cookie": "PVW_LINGUA=it; PVW_VISITE=%7B%22PNIM0001%22%3A%5B%7B%22tipo%22%3A%22comunicati%22%2C%22valore%22%3A0%7D%5D%7D; cookies_consent=none"
        }
    });
    const $ = cheerio.load(data);

    const circolari = [];

    $("#maincontent > section.row.amministrazione-trasparente.sezione-comunicati > div.col-12.col-md-8.trasparenza-content > div").each((i, el) => {
        const titolo = $(el).find("h3").text().trim();
        const descrizione = $(el).find("p").text().trim();
        const pubblicato = $(el).find("ul > li:nth-child(1) > strong").text().trim();
        const tipologia = $(el).find("ul > li:nth-child(2) > strong").text().trim().split(",");
        const allegati = getAllegati($, el);

        if (allegati.length == 0) {
            if ($(el).find(".media-right > .box-allegato-new").length > 0) {
                allegati.push({
                    nome: "File allegato",
                    href: $(".media-right > .box-allegato-new > a:nth-child(1)").attr("href")
                });
            }
        }

        if (titolo)
            circolari.push({
                titolo,
                descrizione,
                pubblicato,
                tipologia,
                allegati
            });
    });

    res.status(200).json({ circolari });
}