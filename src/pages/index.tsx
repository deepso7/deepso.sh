import { allWritings } from "content-collections";

import { Head } from "@/components/head";
import { Portfolio } from "@/components/portfolio";
import { portfolio, toIsoDate, withLiveGithub } from "@/lib/portfolio";

const HomePage = async () => {
  const live = await withLiveGithub(portfolio);
  const writing = allWritings
    .map((w) => ({ date: toIsoDate(w.date), slug: w.slug, title: w.title }))
    .toSorted((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Head />
      <Portfolio data={{ ...live, writing }} />
    </>
  );
};

export default HomePage;

export const getConfig = () => ({
  render: "static",
});
