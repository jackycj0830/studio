# ERP Central - Task List

## 專案進度總覽
**最後更新**: 2024-12-19
**當前階段**: Phase 2 - 文檔管理與規格完善
**完成度**: 約 35%

## Phase 1: Initial Setup & Core Structure (✅ 已完成)
- [x] Project Initialization (Next.js, TypeScript)
- [x] UI Framework (ShadCN, TailwindCSS)
- [x] Basic Layout (Sidebar, Header)
- [x] Placeholder pages for all core ERP modules
- [x] Basic Client-Side Authentication (Login/Logout)
- [x] Readme.md initial draft

## Phase 2: Admin Document Management (🔄 進行中)
- [x] Add `react-markdown` for displaying markdown.
- [x] Create `spec.md` and `todolist.md` placeholders.
- [x] Navigation for Admin Document Viewing.
- [x] Implement viewing of `README.md`, `spec.md`, `todolist.md`.
- [x] **完善 spec.md 規格文件**
  - [x] 添加詳細的循序圖 (Sequence Diagrams)
  - [x] 添加系統類別圖 (Class Diagrams)
  - [x] 完善各模組的業務流程圖
  - [x] 添加智能搜索流程圖
  - [x] 添加會計科目架構圖
- [x] **更新 todolist.md 任務進度**
- [ ] Implement editing functionality for `README.md`.
- [ ] Implement editing functionality for `spec.md`.
- [ ] Implement editing functionality for `todolist.md`.

## Phase 3: Smart Search (Genkit Integration)
- [x] Setup Genkit.
- [x] Basic Smart Search flow definition.
- [x] UI for Smart Search input and displaying suggestions.

## Phase 4: Core Module Implementation (Ongoing)

### Purchasing Cycle
- [ ] **Purchase Request**: UI, Data Model, Logic
- [ ] **Purchase Order**: UI, Data Model, Logic (Partially from old procurement)
- [ ] **Receiving Slip**: UI, Data Model, Logic
- [ ] **Goods Receipt Note**: UI, Data Model, Logic
- [ ] **Vendor Payments**: UI, Data Model, Logic

### Sales Cycle
- [ ] **Quotation**: UI, Data Model, Logic
- [ ] **Sales Order**: UI, Data Model, Logic (Partially from old sales)
- [ ] **Sales Invoice**: UI, Data Model, Logic
- [ ] **Customer Receivables**: UI, Data Model, Logic

### Production Cycle
- [ ] **Bill of Materials (BOM)**: UI, Data Model, Logic
- [ ] **Work Order**: UI, Data Model, Logic
- [ ] **Production Receipt**: UI, Data Model, Logic

### General Ledger Cycle
- [ ] **Voucher**: UI, Data Model, Logic
- [ ] **Journal**: UI, Data Model, Logic
- [ ] **Main Ledger**: UI, Data Model, Logic
- [ ] **Trial Balance**: UI, Data Model, Logic

### Costing Cycle
- [ ] **Cost Calculation**: UI, Data Model, Logic
- [ ] **Cost Analysis**: UI, Data Model, Logic

### Payroll Cycle
- [ ] **Employee Salary Calculation**: UI, Data Model, Logic (Partially from old HR)
- [ ] **Salary Disbursement**: UI, Data Model, Logic

### Fixed Assets Cycle
- [ ] **Asset Management**: UI, Data Model, Logic
- [ ] **Depreciation Calculation**: UI, Data Model, Logic

### Cash Flow Cycle
- [ ] **Bank Transactions**: UI, Data Model, Logic
- [ ] **Cash Flow Statement**: UI, Data Model, Logic

## Phase 5: Enhancements & Refinements
- [ ] Implement robust Role-Based Access Control (RBAC).
- [ ] Database integration for all modules.
- [ ] Comprehensive error handling and validation.
- [ ] Unit and Integration Tests.
- [ ] Improve UI/UX based on feedback.
- [ ] Internationalization (i18n) - if revisited.
- [ ] Deployment optimization.
- [x] Update `spec.md` with detailed flowcharts and sequence diagrams for each module.

## Phase 6: Documentation & GitHub Integration (🔄 進行中)
- [x] **完善專案文檔**
  - [x] 更新 spec.md 包含完整 UML 圖表
  - [x] 更新 todolist.md 反映當前進度
  - [x] 完善 README.md 專案描述
- [ ] **提交文檔到 GitHub**
  - [ ] 提交所有更新的文檔
  - [ ] 創建詳細的 commit 訊息
  - [ ] 推送到遠端倉庫

## Known Issues / Bugs
- 需要實現文檔編輯功能
- 智能搜索功能需要 Google AI API 金鑰配置
- 部分模組仍為佔位符頁面

## Future Ideas
- Dashboard customizations.
- Advanced reporting features.
- Mobile responsiveness enhancements.
- 實時協作編輯功能
- 自動化測試部署流程

## 開發注意事項
1. **遵循 spec.md 開發**: 每次修改程式前都需確認 spec.md 規格
2. **更新任務進度**: 任務完成後都需更新 todolist.md
3. **代碼品質**: 保持代碼整潔，添加適當註釋
4. **測試覆蓋**: 新功能需要編寫對應測試
5. **文檔同步**: 功能變更時同步更新相關文檔
