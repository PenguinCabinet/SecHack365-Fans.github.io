/** @format */

import { Layout } from "../../../components/Layout";
import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
import { GetStaticProps } from "next";
import { FaTwitter } from "react-icons/fa";

import styles from "/styles/writeups.module.css";

const ctfId = "TsukuCTF2021";

const TwitterButton: Function = ({ authors }: { authors: string }) => {
  if (authors.match(/([A-Za-z_]+( ?& ?)?)+/)) {
    return (
      <span>
        {authors
          .split(/ ?& ?/)
          .map<React.ReactNode>((author, idx) => (
            <button
              onClick={() => (location.href = `https://twitter.com/${author}`)}
              className={styles.author}
              key={idx}
            >
              <FaTwitter style={{ color: "#00acee" }} />
              {author}
            </button>
          ))
          .reduce((prev, curr) => [prev, " & ", curr])}
      </span>
    );
  } else {
    return <>{authors}</>;
  }
};

const genre2Style: { [key: string]: string } = {
  tsukushi: styles.tsukushiGenre,
  osint: styles.osintGenre,
  rev: styles.revGenre,
  web: styles.webGenre,
  crypto: styles.cryptoGenre,
  misc: styles.miscGenre,
  hardware: styles.hardwareGenre,
  network: styles.networkGenre,
};

const TsukuCTF = ({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    title: string;
    description: string;
    author: string;
    genre: string;
    solver: number;
    point: number;
  }[];
}) => {
  return (
    <Layout title="TsukuCTF2021 Writeups" description="TsukuCTF2021 Writeups">
      <h1>TsukuCTF 2021</h1>
      <div className={styles.ctfDetails}>
        <a
          href="https://tsukuctf.sechack365.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../../../images/tsukuctf2021.png" alt="TsukuCTF" />
          <div className={styles.ctfLink}>https://tsukuctf.sechack365.com/</div>
        </a>
      </div>
      <hr />
      <div className={styles.writeups}>
        <h2>Writeups</h2>
        <ul>
          {allPostsData
            // ソートの第一条件をジャンル、第二条件をidでソートすることで、並び順を一意にする
            // このソート順にしたのは、ユーザがみた時にジャンル->問題名のアルファベット順で探すと思ったため
            .sort((a, b) =>
              a.genre === b.genre
                ? a.id < b.id
                  ? -1
                  : 1
                : a.genre < b.genre
                ? -1
                : 1
            )
            .map(({ id, title, description, author, genre, solver, point }) => (
              <Link href={`/ctf/${ctfId}/${id}`} key={id} passHref>
                <a>
                  <li className={styles.ctfWriteupList}>
                    <h2>{title}</h2>
                    <span className={styles.writeupsMeta}>
                      <div className={styles.writeupsMetaBox}>
                        Genre:{" "}
                        <span
                          className={`${styles.writeupsGenre} ${
                            genre2Style[genre.toLowerCase()]
                          }`}
                        >
                          {genre}
                        </span>
                      </div>
                      <div className={styles.writeupsMetaBox}>
                        Author: <TwitterButton authors={author} />
                      </div>
                      <div className={styles.writeupsMetaBox}>
                        Point: {point}
                      </div>
                      <div className={styles.writeupsMetaBox}>
                        Solver: {solver}
                      </div>
                    </span>
                    <p>{description}</p>
                  </li>
                </a>
              </Link>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default TsukuCTF;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData(ctfId);
  return {
    props: {
      allPostsData,
    },
  };
};
