
# ERP Central - 企業資源規劃系統

ERP Central 是一個現代化、模組化的企業資源規劃 (ERP) 系統，旨在整合企業各部門的業務流程，提供即時的數據分析和 AI 輔助功能。系統採用最新的 Web 技術架構，提供響應式、直觀且智能化的用戶體驗。

## 🎯 專案目標

- **整合性**: 統一管理企業各部門業務流程
- **現代化**: 採用最新 Web 技術，提供優秀用戶體驗
- **智能化**: 整合 AI 功能，提供智能搜索和數據分析
- **模組化**: 可擴展的模組設計，支持企業成長需求
- **安全性**: 完善的權限控制和數據安全保護

## 🚀 核心功能

### 📊 儀表板總覽
- 即時顯示關鍵 ERP 指標（銷售、庫存、應收帳款等）
- 可自定義的數據視覺化圖表
- 業務趨勢分析和預警提醒

### 💰 銷貨循環管理
- **報價單管理**: 客戶詢價、報價單生成、價格審核
- **銷貨訂單**: 訂單建立、庫存檢查、交期管理
- **銷貨發票**: 自動發票生成、稅務計算
- **客戶應收帳款**: 帳款追蹤、催收管理

### 🛒 進貨循環管理
- **請購單管理**: 採購申請、審核流程、需求分析
- **採購單管理**: 供應商選擇、採購執行、交期追蹤
- **驗收單管理**: 收貨驗收、品質檢查、庫存更新
- **廠商付款**: 應付帳款管理、付款排程

### 🏭 生產循環管理
- **物料清單 (BOM)**: 產品結構管理、成本計算
- **工單管理**: 生產排程、進度追蹤
- **生產入庫**: 完工入庫、品質記錄

### 📚 總帳循環管理
- **傳票管理**: 會計分錄、借貸平衡檢查
- **日記帳**: 交易記錄、過帳處理
- **總分類帳**: 科目餘額、帳務查詢
- **試算表**: 財務報表基礎數據

### 💡 智能數據探索
- **AI 智能搜索**: 利用生成式 AI 提供智能查詢建議
- **自然語言查詢**: 支持中文自然語言業務查詢
- **智能報表推薦**: 根據用戶需求推薦適合的報表

### 🔐 安全認證系統
- JWT Token 認證機制
- 角色基礎訪問控制 (RBAC)
- 操作日誌記錄

## 🛠️ 技術架構

### 前端技術
- **框架**: [Next.js 15](https://nextjs.org/) (App Router) + [React 18](https://reactjs.org/)
- **語言**: [TypeScript](https://www.typescriptlang.org/) - 提供型別安全
- **UI 組件**: [ShadCN UI](https://ui.shadcn.com/) - 現代化組件庫
- **圖標**: [Lucide React](https://lucide.dev/) - 豐富的圖標集
- **樣式**: [Tailwind CSS](https://tailwindcss.com/) - 實用優先的 CSS 框架

### 後端與數據
- **API**: Next.js API Routes - 全棧解決方案
- **數據庫**: SQLite (開發) / PostgreSQL (生產)
- **ORM**: Prisma - 現代化數據庫工具
- **認證**: JWT Token + bcrypt 密碼加密

### AI 與智能功能
- **AI 平台**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **AI 模型**: Google AI (Gemini) - 智能搜索和數據分析
- **自然語言處理**: 支持中文業務查詢

### 狀態管理與表單
- **狀態管理**: Zustand + React Context API
- **表單處理**: React Hook Form - 高效能表單管理
- **數據驗證**: Zod - TypeScript 優先的驗證庫

### 開發與測試
- **測試框架**: Jest + React Testing Library
- **代碼品質**: ESLint + Prettier
- **版本控制**: Git + GitHub

## File Structure Overview

```
/
├── src/
│   ├── app/                     # Next.js App Router: Pages and layouts
│   │   ├── cash-flow/           # Cash Flow Cycle pages
│   │   ├── costing/             # Costing Cycle pages
│   │   ├── fixed-assets/        # Fixed Assets Cycle pages
│   │   ├── general-ledger/      # General Ledger Cycle pages
│   │   ├── login/               # Login page
│   │   ├── payroll/             # Payroll Cycle pages
│   │   ├── production/          # Production Cycle pages
│   │   ├── purchasing/          # Purchasing Cycle pages
│   │   ├── sales/               # Sales Cycle pages
│   │   ├── smart-search/        # Smart Search page
│   │   ├── globals.css          # Global styles and ShadCN theme
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Dashboard/Homepage
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Layout specific components (Header, MainNav, AppLayout)
│   │   ├── ui/                  # ShadCN UI primitive components
│   │   └── smart-search-form.tsx # Smart search UI
│   ├── context/                 # React Context providers (e.g., AuthContext)
│   ├── hooks/                   # Custom React hooks (e.g., useAuth, useMobile, useToast)
│   ├── lib/                     # Utility functions and server actions (e.g., actions.ts for form handling)
│   ├── ai/                      # Genkit AI integration
│   │   ├── flows/               # AI flow definitions (e.g., smart-data-discovery.ts)
│   │   ├── dev.ts               # Genkit development server entry point
│   │   └── genkit.ts            # Genkit core initialization
│   ├── locales/                 # (Currently removed, previously for i18n)
│   └── middleware.ts            # Next.js middleware (currently minimal)
├── public/                      # Static assets (e.g., images, fonts if not from CDN)
├── .env                         # Environment variables (currently empty)
├── components.json              # ShadCN UI configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🚀 快速開始

### 📋 系統需求

- **Node.js**: v18.x 或更高版本
- **包管理器**: npm、yarn 或 pnpm
- **瀏覽器**: Chrome、Firefox、Safari、Edge (最新版本)
- **記憶體**: 建議 4GB 以上
- **硬碟空間**: 至少 1GB 可用空間

### 📦 安裝步驟

1. **克隆專案**
   ```bash
   git clone https://github.com/jackycj0830/studio.git
   cd studio
   ```

2. **安裝依賴**
   ```bash
   npm install
   # 或使用 yarn
   yarn install
   # 或使用 pnpm
   pnpm install
   ```

3. **環境變數設定**

   創建 `.env.local` 文件並配置必要的環境變數：
   ```bash
   # Google AI API 金鑰 (用於智能搜索功能)
   GOOGLE_API_KEY=your_google_api_key_here

   # 數據庫連接 (可選，預設使用 SQLite)
   DATABASE_URL="file:./dev.db"

   # JWT 密鑰 (用於認證)
   JWT_SECRET=your_jwt_secret_here
   ```

### 🏃‍♂️ 運行應用

1. **啟動開發服務器**
   ```bash
   npm run dev
   ```
   應用將在 `http://localhost:9002` 啟動

2. **啟動 AI 服務 (可選)**

   如需使用智能搜索功能，請在新的終端視窗中運行：
   ```bash
   npm run genkit:dev
   # 或監聽文件變化
   npm run genkit:watch
   ```
   Genkit 服務將在 `http://localhost:4000` 啟動

### 🔑 登入資訊

系統內建演示用登入帳號：
- **用戶名**: `admin`
- **密碼**: `123456`

### 🗄️ 數據庫初始化

首次運行時，系統會自動創建 SQLite 數據庫。如需重置數據庫：
```bash
npm run db:reset
# 或手動刪除 dev.db 文件後重新啟動
```

## 🏗️ 生產環境部署

### 建置應用
```bash
npm run build
```

### 啟動生產服務
```bash
npm run start
```

### Docker 部署 (可選)
```bash
# 建置 Docker 映像
docker build -t erp-central .

# 運行容器
docker run -p 3000:3000 erp-central
```

### 環境變數配置
生產環境需要配置以下環境變數：
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
GOOGLE_API_KEY=your_production_api_key
JWT_SECRET=your_strong_jwt_secret
```

## Styling Guidelines

The application follows specific style guidelines for a consistent and professional look:

-   **Primary Color**: Blue (`#4681C4`) - HSL: `205 65% 50%`
-   **Background Color**: Light gray (`#F0F4F8`) - HSL: `220 25% 97%`
-   **Accent Color**: Teal (`#3E8A8A`) - HSL: `175 50% 45%`
-   **Headline Font**: 'Poppins', sans-serif
-   **Body Font**: 'PT Sans', sans-serif

These are configured in `src/app/globals.css` using HSL CSS variables for ShadCN UI theming.

## 🤝 貢獻指南

我們歡迎社群貢獻！請遵循以下步驟：

1. **Fork 專案**
2. **創建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **遵循開發規範**
   - 參考 `spec.md` 進行開發
   - 每次修改前確認規格文件
   - 完成後更新 `todolist.md`
4. **提交變更** (`git commit -m 'Add some AmazingFeature'`)
5. **推送分支** (`git push origin feature/AmazingFeature`)
6. **創建 Pull Request**

### 開發規範
- 遵循 TypeScript 和 ESLint 規則
- 編寫單元測試覆蓋新功能
- 更新相關文檔
- 保持代碼整潔和註釋完整

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 文件

## 📞 聯絡資訊

- **專案維護者**: Jacky Zou
- **GitHub**: [@jackycj0830](https://github.com/jackycj0830)
- **專案連結**: [https://github.com/jackycj0830/studio](https://github.com/jackycj0830/studio)

## 🙏 致謝

感謝以下開源專案的支持：
- [Next.js](https://nextjs.org/) - React 全棧框架
- [ShadCN UI](https://ui.shadcn.com/) - 現代化 UI 組件
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Firebase Genkit](https://firebase.google.com/docs/genkit) - AI 開發平台

---

**⭐ 如果這個專案對您有幫助，請給我們一個 Star！**