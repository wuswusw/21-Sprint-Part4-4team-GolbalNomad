"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Gnb from "@/components/common/gnb/gnb";
import Footer from "@/components/common/Footer";
import HomeBanner from "@/components/home/home-banner";
import HomeSearch from "@/components/home/home-search";
import PopularExperiences from "@/features/activity/components/popular-experiences";
import AllExperiences from "@/features/activity/components/all-experiences";
import AlertModal from "@/components/common/modal/alert-modal";
import { logout } from "@/features/auth/lib/logout";
import type {
  ActivityCategory,
  ActivitySort,
} from "@/features/activity/types/activity.type";

type AuthSnapshot = {
  isLogin: boolean;
  nickname: string;
  profileImage: string;
};

const SERVER_SNAPSHOT: AuthSnapshot = {
  isLogin: false,
  nickname: "",
  profileImage: "",
};

let cachedClientSnapshot: AuthSnapshot = SERVER_SNAPSHOT;

function readAuthFromStorage(): AuthSnapshot {
  return {
    isLogin: !!localStorage.getItem("accessToken"),
    nickname: localStorage.getItem("nickname") ?? "",
    profileImage: localStorage.getItem("profileImage") ?? "",
  };
}

function getClientSnapshot(): AuthSnapshot {
  const nextSnapshot = readAuthFromStorage();

  if (
    cachedClientSnapshot.isLogin === nextSnapshot.isLogin &&
    cachedClientSnapshot.nickname === nextSnapshot.nickname &&
    cachedClientSnapshot.profileImage === nextSnapshot.profileImage
  ) {
    return cachedClientSnapshot;
  }

  cachedClientSnapshot = nextSnapshot;
  return cachedClientSnapshot;
}

function getServerSnapshot(): AuthSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void) {
  const handler = () => {
    callback();
  };

  window.addEventListener("storage", handler);
  window.addEventListener("auth-change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("auth-change", handler);
  };
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const rafId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.history.scrollRestoration = previous;
    };
  }, []);

  const auth = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const [inputKeyword, setInputKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<ActivityCategory | undefined>();
  const [sort, setSort] = useState<ActivitySort>("latest");
  const [page, setPage] = useState(1);

  const authMessage = searchParams.get("authMessage");

  const modalMessage =
    authMessage === "login"
      ? "로그인 되었습니다."
      : authMessage === "logout"
        ? "로그아웃 되었습니다."
        : "";

  const isModalOpen = !!modalMessage;

  const handleLogout = () => {
    logout();
  };

  const handleSearch = () => {
    setCategory(undefined);
    setSort("latest");
    setPage(1);
    setKeyword(inputKeyword.trim());
  };

  const handleCategoryChange = (value?: ActivityCategory) => {
    setKeyword("");
    setInputKeyword("");
    setSort("latest");
    setPage(1);
    setCategory(value);
  };

  const handleSortChange = (value: ActivitySort) => {
    setPage(1);
    setSort(value);
  };

  const handleResetAll = () => {
    setKeyword("");
    setInputKeyword("");
    setCategory(undefined);
    setSort("latest");
    setPage(1);
  };

  const closeModal = () => {
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[linear-gradient(180deg,_#BBDDFF_0%,_#F7FBFF_45%,_#F7F8FA_75%,_#FFFFFF_100%)]">
        <header>
          <Gnb
            isLogin={auth.isLogin}
            nickname={auth.nickname}
            profileImage={auth.profileImage || undefined}
            onLogout={handleLogout}
          />
        </header>

        <main>
          <div className="mx-auto max-w-[1200px] px-6 tablet:px-10 desktop:px-0">
            <HomeBanner />

            <HomeSearch
              keyword={inputKeyword}
              onChangeKeyword={setInputKeyword}
              onSearch={handleSearch}
            />

            {!keyword && <PopularExperiences />}

            <AllExperiences
              category={category}
              sort={sort}
              keyword={keyword}
              page={page}
              onPageChange={setPage}
              onCategoryChange={handleCategoryChange}
              onSortChange={handleSortChange}
              onResetAll={handleResetAll}
            />
          </div>
        </main>
      </div>

      <Footer />

      {isModalOpen && (
        <AlertModal
          description={modalMessage}
          confirmText="확인"
          onClose={closeModal}
          onConfirm={closeModal}
          size="sm"
        />
      )}
    </div>
  );
}