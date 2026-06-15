import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../lib/api";

const COURSE_CONFIG = [
  {
    folder: "Foundation",
    display: "Foundation",
    tagline: "Core reproductive endocrinology",
    accent: "#10b981",
    accentMuted: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.22)",
  },
  {
    folder: "Core",
    display: "Core",
    tagline: "Clinical ART fundamentals",
    accent: "#0ea5e9",
    accentMuted: "rgba(14,165,233,0.12)",
    border: "rgba(14,165,233,0.22)",
  },
  {
    folder: "Advance",
    display: "Advanced",
    tagline: "Advanced techniques and protocols",
    accent: "#8b5cf6",
    accentMuted: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.22)",
  },
  {
    folder: "Masterclass",
    display: "Masterclass",
    tagline: "Expert-level case studies",
    accent: "#C5A46D",
    accentMuted: "rgba(197,164,109,0.12)",
    border: "rgba(197,164,109,0.22)",
  },
] as const;

type CourseCfg = (typeof COURSE_CONFIG)[number];

type VideoItem = {
  key: string;
  name: string;
  size: number;
  lastModified: string;
  accessible: boolean;
};

type CourseData = {
  videos: VideoItem[];
  hasAccess: boolean;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VideoPage() {
  const { isLoggedIn, initialized, user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Record<string, CourseData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialized) return;
    if (!isLoggedIn) navigate("/login");
  }, [initialized, isLoggedIn, navigate]);

  useEffect(() => {
    if (!initialized || !isLoggedIn) return;
    apiGet<{ courses: Record<string, CourseData> }>("/videos/courses")
      .then((data) => setCourses(data.courses))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [initialized, isLoggedIn]);

  const playVideo = async (key: string) => {
    if (activeKey === key && videoUrl) return;
    setLoadingUrl(true);
    setVideoUrl(null);
    setActiveKey(key);
    setPlayerError(null);
    try {
      const data = await apiGet<{ url: string }>(
        `/videos/url?key=${encodeURIComponent(key)}`
      );
      setVideoUrl(data.url);
      setTimeout(() => {
        playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        videoRef.current?.play().catch(() => {});
      }, 100);
    } catch (err) {
      setPlayerError(err instanceof Error ? err.message : "Failed to load video");
      setActiveKey(null);
    } finally {
      setLoadingUrl(false);
    }
  };

  const closePlayer = () => {
    videoRef.current?.pause();
    setActiveKey(null);
    setVideoUrl(null);
    setPlayerError(null);
  };

  if (!initialized) {
    return (
      <div className="min-h-[calc(100vh-60px)] bg-[#0A0E16] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }
  if (!isLoggedIn) return null;

  const activeCfg = activeKey
    ? COURSE_CONFIG.find((c) => activeKey.startsWith(c.folder + "/"))
    : null;
  const activeVideoName = activeKey
    ? activeKey.replace(/^.*\//, "").replace(/\.[^.]+$/, "")
    : null;

  return (
    <section className="min-h-[calc(100vh-60px)] bg-[#0A0E16] px-4 md:px-8 py-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold/70 block mb-2">
            STAR Academy
          </span>
          <h1
            className="font-display text-[clamp(28px,4vw,42px)] font-medium text-ivory leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Video Library
          </h1>
          <p className="text-[14px] text-ivory/40 mt-2">
            {user?.systemRole === "superadmin"
              ? "All course recordings — superadmin view."
              : "Your enrolled course recordings and lecture replays."}
          </p>
        </div>

        {/* Video player */}
        {(activeKey || loadingUrl) && (
          <div
            ref={playerRef}
            className="mb-10 rounded-xl overflow-hidden border border-[rgba(197,164,109,0.18)] bg-black scroll-mt-4"
          >
            <div
              className="h-[3px]"
              style={{
                background: activeCfg
                  ? `linear-gradient(90deg,${activeCfg.accent}60,${activeCfg.accent},${activeCfg.accent}60)`
                  : "linear-gradient(90deg,#a77926,#f7db7d,#a87928)",
              }}
            />
            {loadingUrl ? (
              <div className="flex items-center justify-center h-[300px] md:h-[460px]">
                <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
              </div>
            ) : (
              <video
                ref={videoRef}
                src={videoUrl ?? undefined}
                controls
                controlsList="nodownload"
                className="w-full max-h-[460px] bg-black"
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
            <div className="px-4 py-3 bg-[rgba(255,255,255,0.03)] border-t border-[rgba(197,164,109,0.1)] flex items-center justify-between gap-4">
              <div className="min-w-0">
                {activeCfg && (
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
                    style={{ color: activeCfg.accent }}
                  >
                    {activeCfg.display}
                  </span>
                )}
                <p className="font-mono text-[11px] tracking-[0.1em] text-ivory/60 truncate mt-0.5">
                  {activeVideoName}
                </p>
              </div>
              <button
                onClick={closePlayer}
                className="flex-shrink-0 w-7 h-7 rounded-full border border-[rgba(197,164,109,0.2)] flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-colors text-ivory/40 hover:text-ivory"
                aria-label="Close player"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l8 8M9 1L1 9" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Player error */}
        {playerError && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
            {playerError}
          </div>
        )}

        {/* Course sections */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-400 text-[14px]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {COURSE_CONFIG.map((cfg) => {
              const data = courses[cfg.folder];
              const videos = data?.videos ?? [];
              const hasAccess = data?.hasAccess ?? false;
              const accessibleCount = videos.filter((v) => v.accessible).length;
              return (
                <CourseSection
                  key={cfg.folder}
                  cfg={cfg}
                  videos={videos}
                  hasAccess={hasAccess}
                  accessibleCount={accessibleCount}
                  activeKey={activeKey}
                  loadingKey={loadingUrl ? activeKey : null}
                  onPlay={playVideo}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CourseSection({
  cfg,
  videos,
  hasAccess,
  accessibleCount,
  activeKey,
  loadingKey,
  onPlay,
}: {
  cfg: CourseCfg;
  videos: VideoItem[];
  hasAccess: boolean;
  accessibleCount: number;
  activeKey: string | null;
  loadingKey: string | null;
  onPlay: (key: string) => void;
}) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-1 h-9 rounded-full flex-shrink-0"
          style={{ background: cfg.accent }}
        />
        <div className="flex-1 min-w-0">
          <h2
            className="text-[19px] font-medium text-ivory leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {cfg.display}
          </h2>
          <p className="text-[11.5px] text-ivory/35 mt-0.5">
            {videos.length === 0
              ? "No lectures uploaded yet"
              : `${accessibleCount} of ${videos.length} lecture${videos.length !== 1 ? "s" : ""} accessible`}
          </p>
        </div>
        {!hasAccess && videos.length > 0 && (
          <span
            className="font-mono text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border"
            style={{ color: cfg.accent, borderColor: cfg.border }}
          >
            Not Enrolled
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        className="h-px mb-5 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${cfg.border}, transparent)`,
        }}
      />

      {/* Lecture grid */}
      {videos.length === 0 ? (
        <div
          className="rounded-xl border border-dashed py-10 flex items-center justify-center"
          style={{ borderColor: cfg.border }}
        >
          <p className="text-ivory/20 text-[13px] font-mono tracking-[0.1em]">
            No lectures uploaded yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => (
            <LectureCard
              key={v.key}
              video={v}
              cfg={cfg}
              isActive={activeKey === v.key}
              isLoading={loadingKey === v.key}
              onPlay={() => onPlay(v.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LectureCard({
  video,
  cfg,
  isActive,
  isLoading,
  onPlay,
}: {
  video: VideoItem;
  cfg: CourseCfg;
  isActive: boolean;
  isLoading: boolean;
  onPlay: () => void;
}) {
  const locked = !video.accessible;

  return (
    <button
      onClick={locked ? undefined : onPlay}
      disabled={locked}
      className={[
        "group w-full text-left rounded-xl border transition-all duration-200 overflow-hidden",
        locked
          ? "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.015)] cursor-not-allowed"
          : isActive
          ? "cursor-pointer"
          : "bg-[rgba(255,255,255,0.02)] cursor-pointer",
      ].join(" ")}
      style={
        !locked
          ? {
              borderColor: isActive ? cfg.accent : cfg.border,
              backgroundColor: isActive ? cfg.accentMuted : undefined,
            }
          : undefined
      }
    >
      {/* Thumbnail */}
      <div
        className="relative h-[126px] flex items-center justify-center"
        style={{
          background: locked
            ? "rgba(255,255,255,0.015)"
            : isActive
            ? cfg.accentMuted
            : "rgba(255,255,255,0.025)",
        }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200"
          style={
            locked
              ? { borderColor: "rgba(255,255,255,0.1)" }
              : {
                  borderColor: isActive ? cfg.accent : `${cfg.accent}55`,
                  background: isActive ? `${cfg.accent}20` : "transparent",
                }
          }
        >
          {locked ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-ivory/20"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          ) : isLoading ? (
            <div
              className="w-4 h-4 rounded-full border-[1.5px] border-t-transparent animate-spin"
              style={{
                borderColor: `${cfg.accent}45`,
                borderTopColor: cfg.accent,
              }}
            />
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5 transition-transform duration-150 group-hover:scale-110"
              style={{ color: isActive ? cfg.accent : `${cfg.accent}85` }}
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </div>

        {isActive && !isLoading && (
          <div
            className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full font-mono text-[8.5px] tracking-[0.12em] uppercase"
            style={{
              background: `${cfg.accent}20`,
              color: cfg.accent,
              border: `1px solid ${cfg.accent}35`,
            }}
          >
            Now Playing
          </div>
        )}
      </div>

      {/* Info */}
      <div
        className="px-4 py-3 border-t"
        style={{
          borderColor: locked ? "rgba(255,255,255,0.06)" : `${cfg.accent}28`,
        }}
      >
        <p
          className={[
            "text-[13px] font-medium leading-snug line-clamp-2",
            locked ? "text-ivory/32" : "text-ivory/88",
          ].join(" ")}
        >
          {video.name}
        </p>
        <p className="font-mono text-[9.5px] tracking-[0.1em] text-ivory/25 mt-1.5 flex items-center gap-1.5">
          <span>{formatSize(video.size)}</span>
          <span>·</span>
          <span>
            {new Date(video.lastModified).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </p>
        {locked && (
          <p className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-ivory/18 mt-1.5">
            Contact admin for access
          </p>
        )}
      </div>
    </button>
  );
}
