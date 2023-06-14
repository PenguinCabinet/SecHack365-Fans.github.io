import { VFC } from "react";
import Blog from "../../../components/Layout/Blog";

// 表現駆動のエントリデータ
const ExprData = require("./data/expr.json");

// 学習駆動コースのデータ
const StudyData = require("./data/study.json");

// 開発駆動のエントリデータ
const DevData = require("./data/dev.json");

// 思索駆動のエントリデータ
const ThinkData = require("./data/think.json");

// 研究駆動のエントリデータ
const ResearchData = require("./data/research.json");

const Blog2020: VFC = () => {
  return (
    <Blog
      ExprData={ExprData}
      StudyData={StudyData}
      DevData={DevData}
      ThinkData={ThinkData}
      ResearchData={ResearchData}
      year="2020"
    />
  );
};

export default Blog2020;
