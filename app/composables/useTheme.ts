import { ref } from "vue";

export function useTheme() {
  const isDark = useState("theme-is-dark", () => false);

  const updateThemeClass = () => {
    if (!process.client) return;

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    if (isDark.value) {
      htmlEl.classList.add("dark");
      bodyEl.classList.add("dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      htmlEl.classList.remove("dark");
      bodyEl.classList.remove("dark");
      localStorage.setItem("theme-mode", "light");
    }
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateThemeClass();
  };

  const initTheme = () => {
    if (!process.client) return;

    // Kiểm tra localStorage trước, nếu không có thì lấy theo hệ thống
    const savedTheme = localStorage.getItem("theme-mode");
    if (savedTheme === "dark" || savedTheme === "light") {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    updateThemeClass();

    // Tự động cập nhật nếu user thay đổi setting Hệ điều hành (chỉ khi user chưa ép theme bằng localStorage)
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const currentSavedTheme = localStorage.getItem("theme-mode");
      // Nếu chưa bao giờ toggle tay thì mới ăn theo auto
      if (!currentSavedTheme || currentSavedTheme === "auto") {
        isDark.value = e.matches;
        updateThemeClass();
        // Xóa lại theme-mode dark/light cứng để giữ chế độ auto
        localStorage.removeItem("theme-mode"); 
      }
    });
  };

  return {
    isDark,
    toggleTheme,
    initTheme,
  };
}
