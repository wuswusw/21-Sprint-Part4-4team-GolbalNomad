// 스켈레톤 컴포넌트
import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-gray-50', className)} />;
}
