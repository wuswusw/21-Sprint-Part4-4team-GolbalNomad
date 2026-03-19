import GNB from '@/components/common/gnb/gnb';
import Footer from '@/components/common/Footer';

export default function ReservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
}
