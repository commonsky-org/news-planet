import { $, component$, Resource, useResource$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {

  const articlesLength = useSignal(0);
  const articleIndex = useSignal(0);

  const history = useSignal<number[]>([]);

  const articles = useResource$<Article[]>(
    async () => {      
      const resp = await fetch('https://storage.googleapis.com/news_tlw9mssph/news/latest-news.json');
      const json = (await resp.json()) as News

      articlesLength.value = json.articles.length;
      const randomIndex = Math.floor(Math.random() * json.articles.length);
      articleIndex.value = randomIndex;

      return json.articles;
    }
  );

  const getTime = (published: string | undefined): string => {
    let result: string = "Ages ago?";
    if (published === undefined) return result;

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

  const nextArticle = $(() => {
    history.value.push(articleIndex.value);
    const randomIndex = Math.floor(Math.random() * articlesLength.value);
    articleIndex.value = randomIndex;
  });

  const previousArticle = $(() => {
    const prevIndex = history.value.pop();
    if (prevIndex) {
      articleIndex.value = prevIndex;
    }
  });

  return (
    <>
      <Resource
        value={articles}
        onPending={() => <apint-page></apint-page>}
        onResolved={(articles) => (
          <div style="">

            <apint-page title="News Zen" icon="https://images.vexels.com/media/users/3/130457/isolated/preview/089b7a0e56b2310538f82694adb27942-gefaltetes-zeitungssymbol.png">
              <section class="container_wrap">

                <apint-card title={articles[articleIndex.value].title} image={articles[articleIndex.value].image} description={articles[articleIndex.value].description} href={articles[articleIndex.value].link} 
                  toplefttext={articles[articleIndex.value].location} bylineleft={getTime(articles[articleIndex.value].published)} bylinerightimage={articles[articleIndex.value].icon} 
                  bylineright={articles[articleIndex.value].source} height="64vh" width="84vw" maxWidth="600px" maxHeight="600px"
                  heroImageStyle="max-width: 300px;"></apint-card>
                
                <apint-button label="Prev" style="display: flex; justify-content: center; width: 30%;" onClick$={previousArticle}></apint-button>
                <apint-button label="Next" style="display: flex; justify-content: center; width: 30%;" onClick$={nextArticle}></apint-button>
              </section>
              
            </apint-page>
          </div>
      )}/>
    </>
  );
});

export const head: DocumentHead = {
  title: "News Zen",
  meta: [
    {
      name: "News Zen",
      content: "World news from common sources.",
    },
  ],
};

class News {
  articles: Article[] = [];
  locations: {[key: string]: Location} = {};
}

class Article {
  source?: string = "";
  title?: string = "";
  published?: string = "";
  icon?: string = "";
  description?: string = "";
  image?: string = "";
  link?: string = "";
  location?: string = "";
}

class Location {
  country: string = "";
  city: string = "";
  geometry: {location: {lat: number, lng: number}} = {location: {lat: 0, lng: 0}};
  images: string[] = [];
}

