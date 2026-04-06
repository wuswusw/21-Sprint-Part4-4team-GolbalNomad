import GnbWrapper from '@/components/common/gnb/gnb-wrapper';
import Footer from '@/components/common/Footer';
import ConditionalSidebar from '@/components/layout/ConditionalSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GnbWrapper />
      <div className="tablet:mx-auto tablet:px-[30px] desktop:px-0 desktop:w-[980px] desktop:gap-[50px] tablet:gap-[30px] mb-20 flex w-full">
        <ConditionalSidebar />
        <div className="tablet:gap-[30px] flex w-full flex-col items-center gap-[33px]">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
