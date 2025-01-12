import { component$, Resource, useResource$ } from "@builder.io/qwik";
import type { DocumentHead, DocumentHeadValue } from "@builder.io/qwik-city";

export default component$(() => {

  const articles = useResource$<Article[]>(
    async () => {      
      // const resp = await fetch('latest-news.json');
      const resp = await fetch('https://storage.googleapis.com/news_tlw9mssph/news/latest-news.json');
      const json = (await resp.json()) as News

      return json.articles;
    }
  );

  const getTime = (published: string): string => {
    let result: string = "";
    const articleTime: number = new Date(published).getTime();
    let timeDifferenceInHours = Math.floor((Date.now() - articleTime) / 1000 / 60 / 60);
    if (timeDifferenceInHours < 0) timeDifferenceInHours = 1;

    if (timeDifferenceInHours > 48) {
      result = Math.floor(timeDifferenceInHours / 24) + " days ago";
    }
    else if (timeDifferenceInHours == 1)
      result = timeDifferenceInHours + " hour ago";
    else
      result = timeDifferenceInHours + " hours ago";

    return result;
  }

  return (
    <>
      <Resource
        value={articles}
        onPending={() => <apint-page></apint-page>}
        onResolved={(articles) => (

          <apint-page title={(head as DocumentHeadValue).title}>
            <section class="container_wrap">
              {articles.map((article, i) => (
                <apint-card key={i} title={article.title} image={article.image} description={article.description} href={article.link} toplefttext={article.location} bylineleft={getTime(article.published)} bylinerightimage={article.icon} bylineright={article.source}></apint-card>
              ))}
            </section>
          </apint-page>
      )}/>
    </>
  );
});

export const head: DocumentHead = {
  title: "News zen",
  meta: [
    {
      name: "News zen",
      content: "World news from common sources.",
    },
  ],
};

class News {
  articles: Article[] = [];
  locations: {[key: string]: Location} = {};
}

class Article {
  source: string = "";
  title : string = "";
  published: string = "";
  icon: string = "";
  description: string = "";
  image: string = "";
  link: string = "";
  location: string = "";
}

class Location {
  country: string = "";
  city: string = "";
  geometry: {location: {lat: number, lng: number}} = {location: {lat: 0, lng: 0}};
  images: string[] = [];
}

