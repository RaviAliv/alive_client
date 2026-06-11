import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../lib/api";

type Video = {
  key: string;
  name: string;
  size: number;
  lastModified: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VideoPage() {
  const { isLoggedIn, initialized } = useAuth();
  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Wait for auth to initialize, then redirect if not logged in
  useEffect(() => {
    if (!initialized) return;
    if (!isLoggedIn) navigate("/login");
  }, [initialized, isLoggedIn, navigate]);

  // Fetch video list only after auth is confirmed
  useEffect(() => {
    if (!initialized || !isLoggedIn) return;
    apiGet<{ videos: Video[] }>("/videos")
      .then((data) => setVideos(data.videos))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const playVideo = async (key: string) => {
    if (activeKey === key) return;
    setLoadingUrl(true);
    setVideoUrl(null);
    setActiveKey(key);
    try {
      const data = await apiGet<{ url: string }>(`/videos/url?key=${encodeURIComponent(key)}`);
      setVideoUrl(data.url);
      setTimeout(() => videoRef.current?.play(), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load video");
      setActiveKey(null);
    } finally {
      setLoadingUrl(false);
    }
  };

  if (!initialized) return (
    <div className="min-h-[calc(100vh-60px)] bg-[#0A0E16] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );
  if (!isLoggedIn) return null;

  return (
    <section className="min-h-[calc(100vh-60px)] bg-[#0A0E16] px-4 md:px-8 py-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold/70 block mb-2">
            STAR Academy
          </span>
          <h1 className="font-display text-[clamp(28px,4vw,42px)] font-medium text-ivory leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Video Library
          </h1>
          <p className="text-[14px] text-ivory/40 mt-2">
            Your enrolled course recordings and live session replays.
          </p>
        </div>

        {/* Video Player */}
        {(videoUrl || loadingUrl) && (
          <div className="mb-8 rounded-xl overflow-hidden border border-[rgba(197,164,109,0.2)] bg-black">
            <div className="h-[2px] bg-[linear-gradient(90deg,#a77926,#f7db7d,#a87928)]" />
            {loadingUrl ? (
              <div className="flex items-center justify-center h-[300px] md:h-[480px]">
                <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
              </div>
            ) : (
              <video
                ref={videoRef}
                src={videoUrl ?? undefined}
                controls
                controlsList="nodownload"
                className="w-full max-h-[480px] bg-black"
                onContextMenu={(e) => e.preventDefault()}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {activeKey && (
              <div className="px-4 py-3 bg-[rgba(255,255,255,0.03)] border-t border-[rgba(197,164,109,0.1)]">
                <p className="font-mono text-[11px] tracking-[0.15em] text-gold/60 uppercase truncate">
                  {activeKey.replace(/^.*\//, "").replace(/\.[^.]+$/, "")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Video List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-t-red text-[14px]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors"
            >
              Retry
            </button>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 border border-[rgba(197,164,109,0.15)] rounded-xl">
            <p className="text-ivory/30 text-[14px]">No videos available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <button
                key={v.key}
                onClick={() => playVideo(v.key)}
                className={`group text-left rounded-xl border transition-all duration-200 overflow-hidden ${
                  activeKey === v.key
                    ? "border-gold/50 bg-[rgba(197,164,109,0.08)]"
                    : "border-[rgba(197,164,109,0.15)] bg-[rgba(255,255,255,0.02)] hover:border-gold/30 hover:bg-[rgba(197,164,109,0.05)]"
                }`}
              >
                {/* Thumbnail placeholder */}
                <div className="relative h-[140px] bg-[rgba(255,255,255,0.03)] flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    activeKey === v.key
                      ? "border-gold bg-gold/20"
                      : "border-gold/30 bg-gold/5 group-hover:border-gold/60 group-hover:bg-gold/10"
                  }`}>
                    {loadingUrl && activeKey === v.key ? (
                      <div className="w-5 h-5 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 3l14 9-14 9V3z" fill="currentColor" className="text-gold" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="px-4 py-3 border-t border-[rgba(197,164,109,0.1)]">
                  <p className="font-body text-[13.5px] font-medium text-ivory/90 truncate leading-tight">
                    {v.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-ivory/30 mt-1">
                    {formatSize(v.size)} · {new Date(v.lastModified).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
