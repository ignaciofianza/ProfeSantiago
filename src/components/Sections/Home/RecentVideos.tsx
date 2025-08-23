import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- Tipos mínimos para la respuesta del endpoint de YouTube (TS required, me tiraba warnings y me molestaban) ---
type YTThumbnail = { url?: string };
type YTThumbnails = {
  high?: YTThumbnail;
  medium?: YTThumbnail;
  default?: YTThumbnail;
};
type YTResourceId = { videoId?: string };

type YTPlaylistItem = {
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: YTResourceId;
    thumbnails?: YTThumbnails;
  };
};

type YTPlaylistItemsResponse = {
  items?: YTPlaylistItem[];
};

type VideoItem = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt?: string;
};

type Props = {
  channelId: string; // puede ser el UC... o directamente un UU...
  maxResults?: number; // límite visual (1..12, definir en Home)
  className?: string;
};

// Convierte un channelId "UC..." al playlist "UU... (si no viene UU)"
function uploadsPlaylistId(channelId: string) {
  if (!channelId.startsWith("UC")) return channelId; // si ya viene UU..., siga siga
  return "UU" + channelId.slice(2);
}

const RecentVideos = ({ channelId, maxResults = 6, className }: Props) => {
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- API Key ---
  const apiKey = import.meta.env.VITE_YT_API_KEY as string | undefined;

  // --- Playlist ID ---
  const playlistId = useMemo(() => uploadsPlaylistId(channelId), [channelId]);

  useEffect(() => {
    // Frenazo temprano si falta la API key
    if (!apiKey) {
      setError("Falta VITE_YT_API_KEY en .env");
      setVideos([]); // evito skeleton infinito
      return;
    }

    const key = apiKey; // ahora sí, string garantizado dentro de este scope
    const ctrl = new AbortController();

    async function fetchVideos() {
      try {
        setError(null);
        setVideos(null);

        // Clamp por si maxResults entra raro (mantengo límite visual a 12) mainly para prevenir errores, todo puede pasar
        const limit = Math.min(Math.max(maxResults, 1), 12);

        const url = new URL(
          "https://www.googleapis.com/youtube/v3/playlistItems"
        );
        url.searchParams.set("part", "snippet,contentDetails");
        url.searchParams.set("maxResults", String(limit));
        url.searchParams.set("playlistId", playlistId);
        url.searchParams.set("key", key);

        const res = await fetch(url.toString(), { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: YTPlaylistItemsResponse = await res.json();

        // Mapeo defensivo: si falta algo, devuelve strings vacíos por seguridad
        const mapped: VideoItem[] =
          (data.items ?? []).map((it) => {
            const id =
              it.contentDetails?.videoId ??
              it.snippet?.resourceId?.videoId ??
              ""; // si no hay id, queda vacío (se filtra abajo)

            const title = it.snippet?.title ?? "Video";
            const thumbnail =
              it.snippet?.thumbnails?.high?.url ??
              it.snippet?.thumbnails?.medium?.url ??
              it.snippet?.thumbnails?.default?.url ??
              "";
            const publishedAt =
              it.contentDetails?.videoPublishedAt ?? it.snippet?.publishedAt;

            return { id, title, thumbnail, publishedAt };
          }) ?? [];

        // Filtro videos sin id por si la API devuelve algo rarísimo (seguridad)
        setVideos(mapped.filter((v) => v.id));
      } catch (e: unknown) {
        // Abort: no se trata como error en UI, es NORMAL (segun gpt yo pensaba q estaba haciendo todo mal
        if (e instanceof DOMException && e.name === "AbortError") return;

        if (e instanceof Error) setError(e.message);
        else setError("No se pudieron cargar los videos.");
      }
    }

    fetchVideos();
    return () => ctrl.abort();
  }, [apiKey, playlistId, maxResults]);

  // --- Render de estados ---

  if (error) {
    return (
      <div className={className}>
        <p className="text-sm text-red-400">Error: {error}</p>
      </div>
    );
  }

  // Skeleton (placeholder) mientras carga
  if (!videos) {
    return (
      <div
        className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
          className ?? ""
        }`}
      >
        {Array.from({ length: Math.min(Math.max(maxResults, 1), 12) }).map(
          (_, i) => (
            <Card
              key={i}
              className="border-white/10 overflow-hidden bg-white/[0.04]"
            >
              <div className="aspect-video bg-white/10" />
              <CardContent className="p-4">
                <div className="h-5 w-3/4 bg-white/10 rounded" />
                <div className="mt-2 h-4 w-1/2 bg-white/10 rounded" />
              </CardContent>
            </Card>
          )
        )}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <p className={`text-sm text-white ${className ?? ""}`}>
        No hay videos recientes.
      </p>
    );
  }

  // --- Grid de videos ---
  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}
    >
      {videos.map((v, idx) => (
        <motion.a
          key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.03 }}
          className="block group"
        >
          <Card className="border-white/10 overflow-hidden bg-white/[0.04] hover:bg-white/[0.06] transition">
            <div className="relative aspect-video overflow-hidden">
              {v.thumbnail ? (
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-white/10" />
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="text-white font-semibold line-clamp-2">
                {v.title}
              </h3>
              {v.publishedAt && (
                <p className="mt-1 text-xs text-white/70">
                  {new Date(v.publishedAt).toLocaleDateString()}
                </p>
              )}
              <div className="mt-3">
                <Button
                  variant="outline"
                  className="bg-white text-black font-semibold hover:bg-white/70"
                >
                  Ver en YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.a>
      ))}
    </div>
  );
};

export default RecentVideos;
