import { useState } from "#app";

export interface User {
  id: number;
  name: string;
  email: string;
  image?: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export function useAuth() {
  const user = useState<User | null>("auth_user", () => null);
  const token = useCookie<string | null>("auth_token", {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    path: "/",
  });

  const { api } = useAppFetch();

  const fetchUser = async (explicitToken?: string) => {
    const activeToken = explicitToken || token.value;
    if (!activeToken) {
      user.value = null;
      return null;
    }
    try {
      const { data } = await api.get<User>("/auth/user", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      user.value = data;
      return data;
    } catch (err) {
      console.error("Lỗi khi tải thông tin user:", err);
      // logoutLocal();
      return null;
    }
  };

  const login = (tokenVal: string, userVal: User) => {
    token.value = tokenVal;
    user.value = userVal;
  };

  const logoutLocal = () => {
    token.value = null;
    user.value = null;
    if (process.client) {
      window.location.href = "/dang-nhap";
    }
  };

  const logout = async () => {
    try {
      if (token.value) {
        await api.post("/auth/logout").catch(() => { });
      }
    } catch (e) {
      console.error("Lỗi gọi API logout:", e);
    } finally {
      logoutLocal();
    }
  };

  return {
    user,
    token,
    fetchUser,
    login,
    logout,
  };
}
