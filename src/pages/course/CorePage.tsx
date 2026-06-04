import CourseLayout from "../../components/course/CourseLayout";
import { coreConfig } from "./data/core";

export default function CorePage() {
  return <CourseLayout course={coreConfig} />;
}
