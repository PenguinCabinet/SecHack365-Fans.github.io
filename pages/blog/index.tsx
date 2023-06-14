import { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";

/*
const redurectUrl = "/blog/2020";

const RedirectPage: NextPage = () => {
  const router = useRouter();
  const isReady = router.isReady;

  if (!isReady) {
    return <Loading />;
  }

  router.push(redurectUrl);

  return (
    <Layout>
      <p>
        Redirect to <Link href={redurectUrl}>/blog/2020</Link>
      </p>
    </Layout>
  );
};

export default RedirectPage;

const Loading = () => {
  return (
    <Layout>
      <p>Loading...</p>
    </Layout>
  );
};
*/

const redurectUrl_template = "/blog/";

const Blog_list: NextPage = () => {
  const years = ["2020", "2022"];
  return (
    <Layout
      title="SecHack365 参加記 まとめ"
      description="SecHack365に参加したトレーニーによる参加ブログのまとめです。"
    >
      <h1>年度 SecHack365 参加記 まとめ【随時更新】</h1>
      {years.map((year, index) => (
        <li key={index}>
          <Link href={redurectUrl_template + year}>
            <a>{year}年度 参加記 まとめ</a>
          </Link>
        </li>
      ))}
    </Layout>
  );
};

export default Blog_list;
