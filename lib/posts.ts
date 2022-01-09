import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

/* 指定したCTFの問題情報一覧をソートして取得する */
export function getSortedPostsData(ctfId: string) {
  const problemIds = fs.readdirSync(`${postsDirectory}/${ctfId}`);

  const allPostsData = problemIds.map((problemId) => {
    const id = problemId;
    const fullPath = `${postsDirectory}/${ctfId}/${problemId}/README.md`;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { title: string }),
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.title < b.title) {
      return 1;
    } else {
      return -1;
    }
  });
}

/* 指定したCTFのID(問題名)一覧を取得する */
export function getAllPostIds(ctfId: string) {
  const problemIds = fs.readdirSync(`${postsDirectory}/${ctfId}`);
  return problemIds.map((problemId) => {
    return {
      params: {
        id: problemId,
      },
    };
  });
}

/* 指定した問題のwriteupの内容を取得する */
export async function getPostData(id: string, ctfId: string) {
  const fullPath = `${postsDirectory}/${ctfId}/${id}/README.md`;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
