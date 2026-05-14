import { useEffect, useRef } from 'react';
import { AdSceneManager } from './SceneManager';

export function AdPreview3D({ imageUrl }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Instantiate isolated Three.js logic
    sceneRef.current = new AdSceneManager(canvasRef.current);
    sceneRef.current.animate();

    return () => {
      // Ensure memory cleanup
      sceneRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (imageUrl && sceneRef.current) {
      sceneRef.current.setAdPreview(imageUrl).catch(err => {
        console.error("Failed to load 3D texture:", err);
      });
    }
  }, [imageUrl]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
