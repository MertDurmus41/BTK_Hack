import { useRef, useEffect } from 'react';
import { AdSceneManager } from './SceneManager';

/**
 * @param {{ imageUrl: string }} props
 */
export function AdPreview3D({ imageUrl }) {
  const canvasRef = useRef(null);
  const sceneRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = new AdSceneManager(canvasRef.current);
    sceneRef.current.animate();

    return () => sceneRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (imageUrl && sceneRef.current) {
      sceneRef.current.setAdPreview(imageUrl);
    }
  }, [imageUrl]);

  return <canvas ref={canvasRef} className="three-canvas" />;
}
