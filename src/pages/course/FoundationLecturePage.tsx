import { useParams, Navigate } from "react-router-dom";
import LectureDetailLayout, { type LectureDetailConfig } from "../../components/course/LectureDetailLayout";
import { foundationLectureDetails } from "./data/foundationLectureDetails";

const FOUNDATION_CONFIG: LectureDetailConfig = {
  accent:         "#03582a",
  accentDark:     "#186138",
  darkBg:         "#071410",
  lightBg:        "#f4f8f5",
  courseSlug:     "foundation",
  courseName:     "Foundation Series",
  tierLabel:      "Foundation Series",
  enrollPath:     "/course/foundation/enroll",
  totalLectures:  6,
  ordinals:       ["first", "second", "third", "fourth", "fifth", "sixth"],
};

const calendarEntries = foundationLectureDetails.map(({ num, dateShort, time, title }) => ({
  num, dateShort, time, title,
}));

export default function FoundationLecturePage() {
  const { num } = useParams<{ num: string }>();
  const lecture = foundationLectureDetails.find((l) => l.num === num);

  if (!lecture) return <Navigate to="/course/foundation" replace />;

  return (
    <LectureDetailLayout
      lecture={lecture}
      config={FOUNDATION_CONFIG}
      allLectures={calendarEntries}
    />
  );
}
