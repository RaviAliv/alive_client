import CourseLayout from "../../components/course/CourseLayout";
import { masterclassConfig } from "./data/masterclass";

export default function MasterclassPage() {
  return <CourseLayout course={masterclassConfig} heroOnly />;
}
