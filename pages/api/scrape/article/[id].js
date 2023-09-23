import axios from "axios";
import cheerio from "cheerio";

const getAllegati = ($) => {
    const allegati = [];

    $(".box-allegato-new").each((i, el) => {
        const href = $(el).find("a").attr("href");
        const nome = $(el).find(".box-allegato-titolo").text().trim();

        if (href && nome) allegati.push({ href, nome });
    });

    $(".box-allegato").each((i, el) => {
        const href = $(el).find("a").attr("href");
        const nome = $(el).find("span").text().trim();

        if(href && nome) allegati.push({ href, nome });
    });

    return allegati;
};

export default async function handler(req, res) {
    const { id } = req.query;

    const { data } = await axios.get(`https://liceipujati.edu.it/pagine/${id}`);
    const $ = cheerio.load(data);
    $("iframe").remove();

    const isNews = $(".contenuto-sito").find(".section-gruppo-pagina").length === 0;

    if (isNews) {
        const title = $("#maincontent > section.contenuto-sito > div:nth-child(1) > div").text().trim();
        const body = $(".pagina").html().replace(/style="[^"]*"/g, '');
        const image = $("meta[property=\"og:image\"]").attr("content");
        const views = $(".footer-visite-count").text().trim();
        const allegati = getAllegati($);

        res.status(200).json({ title, body, image, views, allegati });
    } else {
        const title = $(".pagina > div:nth-child(1) > div > h1").text().trim();
        const body = $(".pagina > div:nth-child(2)").html().replace(/style="[^"]*"/g, '');
        const image = $("meta[property=\"og:image\"]").attr("content");
        const views = $(".footer-visite-count").text().trim();
        const allegati = getAllegati($);

        res.status(200).json({ title, body, image, views, allegati });
    }
}