"use client";

import React, { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  PerspectiveCamera,
  OrbitControls,
  Environment,
  Float,
  Sparkles,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Brain,
  Trophy,
  Briefcase,
  User,
  Building2,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import { useNavigate } from "react-router";

type ColorPaletteAttribute = "light" | "dark";

interface CityFeature {
  name: string;
  description: string;
  icon: React.ElementType;
  darkColor: string;
  lightColor: string;
  position: [number, number, number];
  buildingType:
    | "social"
    | "education"
    | "arena"
    | "office"
    | "central"
    | string;
  height: number;
  details: string;
  link: string;
}

// Color palettes for dark and light modes
const COLOR_PALETTES = {
  dark: {
    background: "#181818",
    foreground: "#fffffe",
    primary: "#4fc4cf",
    secondary: "#994ff3",
    accent: "#fbdd74",
    text: "#fffffe",
    muted: "#a1a1aa",
  },
  light: {
    background: "#f8fafc",
    foreground: "#1e293b",
    primary: "#0ea5e9",
    secondary: "#7c3aed",
    accent: "#f59e0b",
    text: "#1e293b",
    muted: "#64748b",
  },
};

// City features/districts
const cityFeatures: CityFeature[] = [
  {
    name: "TownTalk",
    description:
      "Connect, share, and engage with the Overville community. Your social hub for meaningful conversations and networking.",
    icon: MessageCircle,
    darkColor: "#4fc4cf",
    lightColor: "#0ea5e9",
    position: [-8, 0, -4],
    buildingType: "social",
    height: 6,
    details:
      "Social media platform where citizens share ideas, collaborate on projects, and build lasting connections in the digital city.",
    link: "/social",
  },
  {
    name: "WorldBrain",
    description:
      "Expand your knowledge and skills through our comprehensive education platform. Learn, teach, and grow together.",
    icon: Brain,
    darkColor: "#994ff3",
    lightColor: "#7c3aed",
    position: [8, 0, -4],
    buildingType: "education",
    height: 8,
    details:
      "Educational hub offering courses, workshops, and knowledge sharing opportunities for continuous learning and development.",
    link: "/world-brain",
  },
  {
    name: "GrindArena",
    description:
      "Compete, challenge yourself, and rise through the ranks. Prove your skills in various competitive challenges.",
    icon: Trophy,
    darkColor: "#fbdd74",
    lightColor: "#f59e0b",
    position: [-8, 0, 4],
    buildingType: "arena",
    height: 7,
    details:
      "Competitive space where citizens participate in challenges, tournaments, and skill-based competitions to earn recognition.",
    link: "/arena",
  },
  {
    name: "WorkBay",
    description:
      "Find opportunities, showcase your talents, and collaborate on projects. The freelance marketplace of Overville.",
    icon: Briefcase,
    darkColor: "#fffffe",
    lightColor: "#1e293b",
    position: [8, 0, 4],
    buildingType: "office",
    height: 9,
    details:
      "Professional workspace and freelance marketplace connecting talented individuals with exciting projects and opportunities.",
    link: "/work",
  },
  {
    name: "Home",
    description:
      "Let's checkout our main home page where you can get to know about Overworked!",
    icon: User,
    darkColor: "#4fc4cf",
    lightColor: "#0ea5e9",
    position: [0, 0, 0],
    buildingType: "central",
    height: 12,
    details:
      "Central command center for managing your digital identity, blockchain assets, and participation in city governance.",
    link: "/landing",
  },
  {
    name: "Dashboard",
    description:
      "Your personal dashboard and identity center. Manage your NFT identity, tokens, and city participation.",
    icon: User,
    darkColor: "#4fc4cf",
    lightColor: "#0ea5e9",
    position: [17, 0, 7],
    buildingType: "central",
    height: 12,
    details:
      "Central command center for managing your digital identity, blockchain assets, and participation in city governance.",
    link: "/dashboard",
  },
];

// Error Boundary Component
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D City rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#181818] to-black dark:from-[#f8fafc] dark:to-[#e2e8f0]">
          <div className="max-w-md p-6 text-center">
            <Building2 className="mx-auto mb-4 h-16 w-16 text-[#4fc4cf] dark:text-[#0ea5e9]" />
            <h2 className="mb-4 text-xl font-bold text-[#4fc4cf] dark:text-[#0ea5e9]">
              Welcome to Overville
            </h2>
            <p className="mb-4 text-[#fffffe]/80 dark:text-[#1e293b]/80">
              The city is loading. Please wait while we prepare your digital
              experience.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded bg-[#4fc4cf] px-4 py-2 text-[#181818] transition-colors hover:bg-[#4fc4cf]/90 dark:bg-[#0ea5e9] dark:text-[#f8fafc] dark:hover:bg-[#0ea5e9]/90"
            >
              Enter City
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Animated City Lights Component
function CityLights({
  count = 50,
  theme,
}: {
  count: number;
  theme: ColorPaletteAttribute;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = COLOR_PALETTES[theme];
    const cityColors = [
      palette.primary,
      palette.secondary,
      palette.accent,
      palette.foreground,
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread lights across the city
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = Math.random() * 8 + 1;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      // Random city colors
      const color = new THREE.Color(
        cityColors[Math.floor(Math.random() * cityColors.length)],
      );
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 0.5 + 0.2;
    }

    return [positions, colors, sizes];
  }, [count, theme]);

  useFrame(({ clock }) => {
    if (pointsRef.current && materialRef.current) {
      const time = clock.getElapsedTime();
      // Animate light intensity
      materialRef.current.opacity =
        theme === "dark"
          ? 0.6 + Math.sin(time * 2) * 0.2
          : 0.4 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.3}
        transparent
        opacity={theme === "dark" ? 0.8 : 0.5}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Building Component
function CityBuilding({
  feature,
  onClick,
  isHovered,
  onHover,
  onUnhover,
  theme,
}: {
  feature: CityFeature;
  onClick: (feature: CityFeature) => void;
  onHover: () => void;
  onUnhover: () => void;
  isHovered: boolean;
  theme: ColorPaletteAttribute;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);

  const color = theme === "dark" ? feature.darkColor : feature.lightColor;
  const textColor = COLOR_PALETTES[theme].text;
  const outlineColor =
    theme === "dark"
      ? COLOR_PALETTES.dark.background
      : COLOR_PALETTES.light.background;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.5 + feature.position[0]) * 0.1;

      // Hover effects
      if (isHovered) {
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, 1.05, 0.1),
        );
      } else {
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1),
        );
      }
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.2 + 0.8;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isHovered
        ? pulse * (theme === "dark" ? 0.6 : 0.4)
        : pulse * (theme === "dark" ? 0.3 : 0.2);
    }

    if (textRef.current) {
      // Text floating animation
      textRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 1.5) * 0.05 + feature.height + 1;
    }
  });

  const renderBuilding = () => {
    switch (feature.buildingType) {
      case "social":
        return (
          <group>
            {/* Main tower */}
            <mesh
              position={[0, feature.height / 2, 0]}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[1.5, 2, feature.height, 8]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.3}
                roughness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Communication rings */}
            {[0.3, 0.6, 0.9].map((height, i) => (
              <mesh
                key={i}
                position={[0, feature.height * height, 0]}
                rotation={[0, (i * Math.PI) / 3, 0]}
              >
                <torusGeometry args={[2.5, 0.1, 8, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.7} />
              </mesh>
            ))}
          </group>
        );

      case "education":
        return (
          <group>
            {/* Main building */}
            <mesh
              position={[0, feature.height / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[3, feature.height, 3]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.2}
                roughness={0.3}
                clearcoat={1}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Knowledge orbs */}
            {[-1, 0, 1].map((x, i) => (
              <Float
                key={i}
                speed={2 + i}
                rotationIntensity={0.5}
                floatIntensity={0.5}
              >
                <mesh position={[x * 2, feature.height + 1, 0]}>
                  <sphereGeometry args={[0.3, 16, 16]} />
                  <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
              </Float>
            ))}
          </group>
        );

      case "arena":
        return (
          <group>
            {/* Stadium base */}
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[3, 3, 2, 16]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.4}
                roughness={0.2}
                clearcoat={1}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Arena tower */}
            <mesh
              position={[0, feature.height / 2 + 1, 0]}
              castShadow
              receiveShadow
            >
              <coneGeometry args={[1.5, feature.height - 2, 8]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.5}
                roughness={0.1}
                clearcoat={1}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Victory flames */}
            <mesh position={[0, feature.height + 1, 0]}>
              <coneGeometry args={[0.5, 1, 6]} />
              <meshBasicMaterial color={color} transparent opacity={0.8} />
            </mesh>
          </group>
        );

      case "office":
        return (
          <group>
            {/* Main office tower */}
            <mesh
              position={[0, feature.height / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[2.5, feature.height, 2.5]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.6}
                roughness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.05}
                transparent
                opacity={0.95}
              />
            </mesh>
            {/* Office floors (windows) */}
            {Array.from({ length: Math.floor(feature.height / 1.5) }).map(
              (_, i) => (
                <mesh key={i} position={[0, i * 1.5 + 0.75, 1.26]}>
                  <planeGeometry args={[2, 1]} />
                  <meshBasicMaterial
                    color={COLOR_PALETTES[theme].primary}
                    transparent
                    opacity={0.3}
                  />
                </mesh>
              ),
            )}
          </group>
        );

      case "central":
        return (
          <group>
            {/* Central command tower */}
            <mesh
              position={[0, feature.height / 2, 0]}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[1, 3, feature.height, 6]} />
              <meshPhysicalMaterial
                color={color}
                metalness={0.7}
                roughness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.05}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Data streams */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2;
              const x = Math.cos(angle) * 4;
              const z = Math.sin(angle) * 4;
              return (
                <mesh
                  key={i}
                  position={[x, feature.height / 2, z]}
                  rotation={[0, angle, 0]}
                >
                  <cylinderGeometry
                    args={[0.1, 0.1, feature.height * 0.8, 8]}
                  />
                  <meshBasicMaterial color={color} transparent opacity={0.6} />
                </mesh>
              );
            })}
            {/* Central orb */}
            <Float speed={1} rotationIntensity={1} floatIntensity={0.3}>
              <mesh position={[0, feature.height + 1, 0]}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.8} />
              </mesh>
            </Float>
          </group>
        );

      default:
        return (
          <mesh position={[0, feature.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[2, feature.height, 2]} />
            <meshPhysicalMaterial
              color={color}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        );
    }
  };

  return (
    <group
      position={feature.position}
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick(feature);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "auto";
        onUnhover();
      }}
    >
      {/* Building structure */}
      {renderBuilding()}

      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, feature.height / 2, 0]} scale={1.1}>
        <cylinderGeometry args={[3, 3, feature.height + 2, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Floating text label */}
      <group ref={textRef} position={[0, feature.height + 1, 0]}>
        <Text
          fontSize={0.8}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          font={undefined}
          maxWidth={6}
          textAlign="center"
          fontWeight="bold"
          outlineWidth={0.02}
          outlineColor={outlineColor}
        >
          {feature.name}
        </Text>
      </group>
    </group>
  );
}

// Ground/Base Component
function CityGround({ theme }: { theme: ColorPaletteAttribute }) {
  const groundRef = useRef<THREE.Mesh>(null);
  const palette = COLOR_PALETTES[theme];

  useFrame(({ clock }) => {
    if (groundRef.current) {
      // Subtle grid animation
      (groundRef.current.material as THREE.ShaderMaterial).uniforms.time.value =
        clock.getElapsedTime();
    }
  });

  // Custom shader material for animated grid
  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(palette.background) },
        color2: { value: new THREE.Color(palette.secondary) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        
        void main() {
          vec2 grid = abs(fract(vUv * 20.0) - 0.5);
          float line = smoothstep(0.0, 0.1, min(grid.x, grid.y));
          
          vec3 color = mix(color2, color1, line);
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          
          gl_FragColor = vec4(color * pulse, ${theme === "dark" ? "0.3" : "0.2"});
        }
      `,
      transparent: true,
    });
  }, [theme]);

  return (
    <mesh
      ref={groundRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50]} />
      <primitive object={gridMaterial} attach="material" />
    </mesh>
  );
}

// Main City Scene Component
function OvervilleCity({
  setSelectedFeature,
  theme,
}: {
  setSelectedFeature: (feature: CityFeature) => void;
  theme: ColorPaletteAttribute;
}) {
  const [hoveredBuilding, setHoveredBuilding] = useState<number | null>(0);
  const cityRef = useRef<THREE.Group>(null);
  const palette = COLOR_PALETTES[theme];

  return (
    <group ref={cityRef}>
      {/* City Ground */}
      <CityGround theme={theme} />

      {/* City Buildings */}
      {cityFeatures.map((feature, index) => (
        <CityBuilding
          key={feature.name}
          feature={feature}
          onClick={setSelectedFeature}
          isHovered={hoveredBuilding === index}
          onHover={() => setHoveredBuilding(index)}
          onUnhover={() => setHoveredBuilding(null)}
          theme={theme}
        />
      ))}

      {/* City Lights */}
      <CityLights count={100} theme={theme} />

      {/* Ambient Sparkles */}
      <Sparkles
        count={200}
        scale={25}
        size={0.4}
        speed={0.2}
        opacity={theme === "dark" ? 0.6 : 0.3}
        color={palette.foreground}
      />

      {/* Stars in the sky - only in dark mode */}
      {theme === "dark" && (
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      )}
    </group>
  );
}

// Main Component
export default function OvervilleCityViewer() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedFeature, setSelectedFeature] = useState<CityFeature | null>();
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([15, 10, 15]);

  // Responsive camera positioning
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setCameraPosition(isMobile ? [20, 12, 20] : [15, 10, 15]);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (selectedFeature?.link) {
      navigate(selectedFeature.link);
    }
  };

  return (
    <ErrorBoundary>
      <div
        className={`relative h-full w-full bg-gradient-to-b ${theme === "dark" ? "from-[#181818] to-gray-900" : "from-[#f8fafc] to-[#e2e8f0]"}`}
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div
                  className={`h-12 w-12 animate-spin rounded-full border-b-2 ${theme === "dark" ? "border-[#4fc4cf]" : "border-[#0ea5e9]"} mx-auto mb-4`}
                ></div>
                <p
                  className={
                    theme === "dark" ? "text-[#fffffe]" : "text-[#1e293b]"
                  }
                >
                  Loading Overville...
                </p>
              </div>
            </div>
          }
        >
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
            <color
              attach="background"
              args={[COLOR_PALETTES[theme].background]}
            />
            <fog
              attach="fog"
              args={[COLOR_PALETTES[theme].background, 20, 60]}
            />

            <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

            {/* Lighting Setup */}
            <ambientLight
              intensity={theme === "dark" ? 0.3 : 0.5}
              color={COLOR_PALETTES[theme].foreground}
            />
            <directionalLight
              position={[10, 20, 10]}
              intensity={theme === "dark" ? 1 : 1.2}
              color={COLOR_PALETTES[theme].foreground}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={50}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            <pointLight
              position={[0, 15, 0]}
              intensity={0.5}
              color={COLOR_PALETTES[theme].primary}
            />
            <pointLight
              position={[-10, 10, -10]}
              intensity={0.3}
              color={COLOR_PALETTES[theme].secondary}
            />
            <pointLight
              position={[10, 10, 10]}
              intensity={0.3}
              color={COLOR_PALETTES[theme].accent}
            />

            {/* Environment */}
            <Environment preset={theme === "dark" ? "night" : "sunset"} />

            {/* Main City */}
            <OvervilleCity
              setSelectedFeature={setSelectedFeature}
              theme={theme}
            />

            {/* Camera Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              minDistance={8}
              maxDistance={40}
              autoRotate={false}
              dampingFactor={0.05}
              enableDamping={true}
              panSpeed={0.5}
              rotateSpeed={0.5}
              zoomSpeed={0.8}
            />
          </Canvas>
        </Suspense>

        {/* Feature Detail Modal */}
        <Dialog
          open={!!selectedFeature}
          onOpenChange={() => setSelectedFeature(null)}
        >
          <DialogContent
            className={`sm:max-w-lg ${theme === "dark" ? "border-[#4fc4cf]/30 bg-[#181818]/95 text-[#fffffe]" : "border-[#0ea5e9]/30 bg-white/95 text-[#1e293b]"} border backdrop-blur-md`}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                {selectedFeature && (
                  <>
                    {React.createElement(selectedFeature.icon, {
                      className: "h-8 w-8",
                      style: {
                        color:
                          theme === "dark"
                            ? selectedFeature.darkColor
                            : selectedFeature.lightColor,
                      },
                    })}
                    <span
                      style={{
                        color:
                          theme === "dark"
                            ? selectedFeature.darkColor
                            : selectedFeature.lightColor,
                      }}
                    >
                      {selectedFeature.name}
                    </span>
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-6">
              <p
                className={`${theme === "dark" ? "text-[#fffffe]/90" : "text-[#1e293b]/90"} text-lg leading-relaxed`}
              >
                {selectedFeature?.description}
              </p>
              <div
                className={`rounded-lg border p-4 ${theme === "dark" ? "border-[#4fc4cf]/20 bg-[#181818]/50" : "border-[#0ea5e9]/20 bg-white/50"}`}
              >
                <p
                  className={`${theme === "dark" ? "text-[#fffffe]/80" : "text-[#1e293b]/80"} text-sm leading-relaxed`}
                >
                  {selectedFeature?.details}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleClick}
                className={`${theme === "dark" ? "bg-[#4fc4cf] text-[#181818] hover:bg-[#4fc4cf]/90" : "bg-[#0ea5e9] text-white hover:bg-[#0ea5e9]/90"} rounded-lg px-6 py-2 font-semibold transition-all duration-200`}
              >
                Explore More
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Navigation Instructions */}
        <div
          className={`absolute bottom-6 left-6 right-6 rounded-lg border p-3 backdrop-blur-sm ${theme === "dark" ? "border-[#4fc4cf]/30 bg-[#181818]/80 text-[#fffffe]" : "border-[#0ea5e9]/30 bg-white/80 text-[#1e293b]"}`}
        >
          <p
            className={`text-center text-sm md:text-base ${theme === "dark" ? "text-[#fffffe]/80" : "text-[#1e293b]/80"}`}
          >
            🖱️ Click and drag to rotate • 🔍 Scroll to zoom • 🏢 Click buildings
            to explore
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}
