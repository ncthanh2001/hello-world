import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    'search': 'Tìm kiếm...',
    'myAccount': 'Tài khoản của tôi',
    'profile': 'Hồ sơ',
    'settings': 'Cài đặt',
    'logout': 'Đăng xuất',
    'login': 'Đăng nhập',
    'signup': 'Đăng ký',
    'email': 'Email',
    'password': 'Mật khẩu',
    'confirmPassword': 'Xác nhận mật khẩu',
    'loginDesc': 'Nhập thông tin đăng nhập của bạn',
    'signupDesc': 'Tạo tài khoản mới để bắt đầu',
    'processing': 'Đang xử lý...',
    'orContinueWith': 'Hoặc tiếp tục với',
    'loginWithGoogle': 'Đăng nhập với Google',
  },
  en: {
    'search': 'Search...',
    'myAccount': 'My Account',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout',
    'login': 'Login',
    'signup': 'Sign up',
    'email': 'Email',
    'password': 'Password',
    'confirmPassword': 'Confirm Password',
    'loginDesc': 'Enter your login credentials',
    'signupDesc': 'Create a new account to get started',
    'processing': 'Processing...',
    'orContinueWith': 'Or continue with',
    'loginWithGoogle': 'Login with Google',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
