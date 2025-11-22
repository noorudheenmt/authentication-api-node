import fs from "fs";
import path from "path";

const loadTemplate = (fileName) => {
  const filePath = path.join(process.cwd(), "src", "templates", fileName);
  return fs.readFileSync(filePath, "utf8");
};

export default loadTemplate;