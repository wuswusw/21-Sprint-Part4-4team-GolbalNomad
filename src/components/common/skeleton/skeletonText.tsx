// 스켈레톤 컴포넌트 - 텍스트
type SkeletonTextProps = {
  lines?: number;
};

export default function SkeletonText({ lines = 3 }: SkeletonTextProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={index === lines - 1 ? 'h-4 w-2/3' : 'h-4 w-full'} />
      ))}
    </div>
  );
}
