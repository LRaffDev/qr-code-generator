import { useState, useRef, useEffect } from "react";
import "./index.css";
import * as htmlImage from "html-to-image";
import QRCode from "react-qr-code";

function App() {
  const [url, setUrl] = useState("");
  const [dimensioni, setDimensioni] = useState(100);
  const [qrVisibile, setQrVisibile] = useState(false);

  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  const handleQrCode = () => {
    if (!url) {
      alert("Inserisci un URL");
      return;
    }
    setQrVisibile(true);
  };

  useEffect(() => {
    if (url.trim() === "") setQrVisibile(false);
  }, [url]);

  const downloadQrCode = async () => {
    if (qrCodeRef.current) {
      const dataUrl = await htmlImage.toPng(qrCodeRef.current);
      const link = document.createElement("a");
      link.download = "qrCode.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <main className="flex items-center w-screen h-screen p-20 justify-between bg-white px-32">
      <div className="flex flex-col items-center gap-3 p-8">
        <h1 className="font-bold">QR CODE GENERATOR</h1>
        <select
          id="dimensione"
          className="text-[#353238] w-80 h-10 rounded-lg text-center text-xl border-2 border-[#a9a9a9]"
          value={dimensioni}
          onChange={(e) => {
            setDimensioni(Number(e.target.value));
          }}
        >
          {[100, 150, 200, 250, 300].map((size) => (
            <option value={size} key={size}>
              {size} x {size} px
            </option>
          ))}
        </select>

        <input
          type="text"
          id="qrlink"
          placeholder="Inserisci l'URL"
          value={url}
          className=" placeholder:text-[#353238] text-[#353238] w-80 h-10 rounded-lg text-center text-xl border-2 border-[#a9a9a9]"
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleQrCode();
          }}
        />

        <button
          type="button"
          onClick={handleQrCode}
          className="text-[#353238] w-80 h-10 rounded-lg border-2 bg-[#ffffe0] border-[#a9a9a9]"
        >
          Genera QRCode!
        </button>
      </div>

      {qrVisibile && (
        <div className="flex flex-col items-center gap-3">
          <div ref={qrCodeRef}>
            <QRCode value={url} size={dimensioni} />
          </div>
          <button
            onClick={downloadQrCode}
            className="text-[#353238] border-2 w-50 h-10 rounded-lg  px-2 bg-[#ffffe0] border-[#a9a9a9]"
          >
            Scarica QRCode
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
