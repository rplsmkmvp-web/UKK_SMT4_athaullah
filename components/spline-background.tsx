export function SplineBackground({ sceneUrl }: { sceneUrl: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <iframe
        src={sceneUrl}
        title="Latar 3D Spline"
        loading="eager"
        tabIndex={-1}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        className="size-full border-0"
      />
    </div>
  )
}
