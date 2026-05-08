import { useEffect, useState } from "react";

const PreviewTimeout = () => {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const isPreview = window.location.hostname.includes("id-preview--");
    if (!isPreview) return;
    const t = setTimeout(() => setExpired(true), 11000);
    return () => clearTimeout(t);
  }, []);

  if (!expired) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#0d181b",
        color: "#ffa343",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "1.75rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      Tack för att du tittat!
    </div>
  );
};

export default PreviewTimeout;
