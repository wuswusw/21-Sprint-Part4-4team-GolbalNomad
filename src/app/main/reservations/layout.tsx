import GNB from '@/components/common/GNB';
import Footer from '@/components/common/Footer';
import Sidemenu from '@/components/common/Sidemenu';

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div className="mx-auto flex w-[980px] gap-12.5">
        <div className="w-72.5">
          <Sidemenu />
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </>
  );
}
