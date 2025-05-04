import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import QRCode from "qrcode";

interface QRCodeProps {
  value: string;
  size?: number;
}

export default component$(({ value, size = 128 }: QRCodeProps) => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => value); // Regenerar QR cuando cambie el valor
    if (canvasRef.value) {
      QRCode.toCanvas(canvasRef.value, value, { width: size, color: {light: "443E67", dark: "FFFFFF"} });
    }
  });

  return (
    <div style={{ width: size, height: size, borderRadius: "4%", overflow: "hidden", background: "#443E67" }}>
      <canvas ref={canvasRef} />
    </div>
  );
});
