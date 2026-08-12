import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import '../styles/LightRays.css';

const DEFAULT_COLOR = '#ffffff';

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [
        parseInt(match[1], 16) / 255,
        parseInt(match[2], 16) / 255,
        parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (origin, width, height) => {
  const outside = 0.2;

  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * height], dir: [0, 1] };
    case 'top-right':
      return { anchor: [width, -outside * height], dir: [0, 1] };
    case 'left':
      return { anchor: [-outside * width, 0.5 * height], dir: [1, 0] };
    case 'right':
      return { anchor: [(1 + outside) * width, 0.5 * height], dir: [-1, 0] };
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * height], dir: [0, -1] };
    case 'bottom-center':
      return { anchor: [0.5 * width, (1 + outside) * height], dir: [0, -1] };
    case 'bottom-right':
      return { anchor: [width, (1 + outside) * height], dir: [0, -1] };
    default:
      return { anchor: [0.5 * width, -outside * height], dir: [0, 1] };
  }
};

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = '',
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!isVisible || !container) return undefined;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.replaceChildren(gl.canvas);

    const vertex = `
      attribute vec2 position;
      varying vec2 vUv;

      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision highp float;

      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec2 rayPos;
      uniform vec2 rayDir;
      uniform vec3 raysColor;
      uniform float raysSpeed;
      uniform float lightSpread;
      uniform float rayLength;
      uniform float pulsating;
      uniform float fadeDistance;
      uniform float saturation;
      uniform vec2 mousePos;
      uniform float mouseInfluence;
      uniform float noiseAmount;
      uniform float distortion;
      varying vec2 vUv;

      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float rayStrength(
        vec2 raySource,
        vec2 rayRefDirection,
        vec2 coord,
        float seedA,
        float seedB,
        float speed
      ) {
        vec2 sourceToCoord = coord - raySource;
        vec2 dirNorm = normalize(sourceToCoord);
        float cosAngle = dot(dirNorm, rayRefDirection);
        float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
        float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
        float distance = length(sourceToCoord);
        float maxDistance = iResolution.x * rayLength;
        float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
        float fadeFalloff = clamp(
          (iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance),
          0.5,
          1.0
        );
        float pulse = pulsating > 0.5 ? 0.8 + 0.2 * sin(iTime * speed * 3.0) : 1.0;
        float baseStrength = clamp(
          (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
          (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
          0.0,
          1.0
        );

        return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
        vec2 finalRayDir = rayDir;

        if (mouseInfluence > 0.0) {
          vec2 mouseScreenPos = mousePos * iResolution.xy;
          vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
          finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
        }

        vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
        vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
        fragColor = rays1 * 0.5 + rays2 * 0.4;

        if (noiseAmount > 0.0) {
          float n = noise(coord * 0.01 + iTime * 0.1);
          fragColor.rgb *= 1.0 - noiseAmount + noiseAmount * n;
        }

        float brightness = 1.0 - coord.y / iResolution.y;
        fragColor.x *= 0.1 + brightness * 0.8;
        fragColor.y *= 0.3 + brightness * 0.6;
        fragColor.z *= 0.5 + brightness * 0.5;

        if (saturation != 1.0) {
          float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
          fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
        }

        fragColor.rgb *= raysColor;
      }

      void main() {
        vec4 color;
        mainImage(color, gl_FragCoord.xy);
        gl_FragColor = color;
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const updatePlacement = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      const renderWidth = width * renderer.dpr;
      const renderHeight = height * renderer.dpr;
      const { anchor, dir } = getAnchorAndDir(raysOrigin, renderWidth, renderHeight);
      uniforms.iResolution.value = [renderWidth, renderHeight];
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = dir;
    };

    const resizeObserver = new ResizeObserver(updatePlacement);
    resizeObserver.observe(container);
    updatePlacement();

    const handleMouseMove = (event) => {
      if (!followMouse) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('pointermove', handleMouseMove, { passive: true });

    let frameId;
    const animate = (time) => {
      uniforms.iTime.value = time * 0.001;

      if (followMouse && mouseInfluence > 0) {
        const smoothing = 0.92;
        smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
        smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
        uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
      }

      renderer.render({ scene: mesh });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handleMouseMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [
    distortion,
    fadeDistance,
    followMouse,
    isVisible,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ]);

  return <div ref={containerRef} className={`light-rays-container ${className}`.trim()} />;
}
