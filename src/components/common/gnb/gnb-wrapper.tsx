'use client';

import { useSyncExternalStore } from 'react';
import Gnb from './gnb';

type AuthSnapshot = { isLogin: boolean; nickname: string; profileImage: string };

const SERVER_SNAPSHOT: AuthSnapshot = { isLogin: false, nickname: '', profileImage: '' };
let cachedClientSnapshot: AuthSnapshot = SERVER_SNAPSHOT;

function readAuthFromStorage(): AuthSnapshot {
  return {
    isLogin: !!localStorage.getItem('accessToken'),
    nickname: localStorage.getItem('nickname') ?? '',
    profileImage: localStorage.getItem('profileImage') ?? '',
  };
}

function getClientSnapshot(): AuthSnapshot {
  const next = readAuthFromStorage();
  if (
    cachedClientSnapshot.isLogin === next.isLogin &&
    cachedClientSnapshot.nickname === next.nickname &&
    cachedClientSnapshot.profileImage === next.profileImage
  )
    return cachedClientSnapshot;
  cachedClientSnapshot = next;
  return cachedClientSnapshot;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('auth-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('auth-change', callback);
  };
}

export default function GnbWrapper() {
  const auth = useSyncExternalStore(subscribe, getClientSnapshot, () => SERVER_SNAPSHOT);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileImage');
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <Gnb
      isLogin={auth.isLogin}
      nickname={auth.nickname}
      profileImage={auth.profileImage || undefined}
      onLogout={handleLogout}
    />
  );
}
