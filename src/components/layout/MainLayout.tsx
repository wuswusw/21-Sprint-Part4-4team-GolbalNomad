import GNB from "@/components/common/GNB";
import Footer from "@/components/common/Footer";

/**
 * GNB + Footer가 포함된 기본 레이아웃
 * @description 로그인/회원가입 페이지를 제외한 모든 페이지에서 사용
 * @example
 * <MainLayout>
 *   <div>페이지 콘텐츠</div>
 * </MainLayout>
 */
function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <GNB />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
