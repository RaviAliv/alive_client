import { useParams, Navigate } from "react-router-dom";
import LectureDetailLayout, { type LectureDetailConfig } from "../../components/course/LectureDetailLayout";
import { coreLectureDetails } from "./data/coreLectureDetails";

const CORE_CONFIG: LectureDetailConfig = {
  accent:        "#D4A621",
  accentDark:    "#A88516",
  darkBg:        "#1A1505",
  lightBg:       "#e8ddc0",
  courseSlug:    "core",
  courseName:    "Core Series",
  tierLabel:     "Core Series · Tier II",
  enrollPath:    "/course/core",
  totalLectures: 5,
  ordinals:      ["first", "second", "third", "fourth", "fifth"],
};

const calendarEntries = coreLectureDetails.map(({ num, dateShort, time, title }) => ({
  num, dateShort, time, title,
}));

export default function CoreLecturePage() {
  const { num } = useParams<{ num: string }>();
  const lecture = coreLectureDetails.find((l) => l.num === num);

  if (!lecture) return <Navigate to="/course/core" replace />;

  return (
    <LectureDetailLayout
      lecture={lecture}
      config={CORE_CONFIG}
      allLectures={calendarEntries}
    />
  );
}
