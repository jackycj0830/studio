# ERP Central 系統規格文件

## 1. 專案概述

### 1.1 專案名稱
ERP Central - 企業資源規劃系統

### 1.2 專案目標
建立一個現代化、模組化的 ERP 系統，整合企業各部門的業務流程，提供即時的數據分析和 AI 輔助功能。

### 1.3 技術架構
- **前端**: Next.js 15 + React 18 + TypeScript
- **UI 框架**: ShadCN UI + Tailwind CSS
- **狀態管理**: Zustand + React Context
- **數據庫**: SQLite (開發) / PostgreSQL (生產)
- **ORM**: Prisma
- **AI 整合**: Firebase Genkit + Google AI
- **測試**: Jest + React Testing Library

## 2. 系統架構

### 2.1 整體架構圖

```mermaid
graph TB
    A[用戶界面 - Next.js Frontend] --> B[API 層 - Next.js API Routes]
    B --> C[業務邏輯層 - Services]
    C --> D[數據訪問層 - Prisma ORM]
    D --> E[數據庫 - SQLite/PostgreSQL]
    
    B --> F[AI 服務 - Genkit]
    F --> G[Google AI - Gemini]
    
    H[認證系統] --> B
    I[文件系統] --> B
    
    subgraph "前端模組"
        A1[儀表板]
        A2[進貨循環]
        A3[銷貨循環]
        A4[生產循環]
        A5[總帳循環]
        A6[智能搜索]
    end
    
    A --> A1
    A --> A2
    A --> A3
    A --> A4
    A --> A5
    A --> A6
```

### 2.2 數據庫架構圖

```mermaid
erDiagram
    User ||--o{ PurchaseRequest : creates
    User ||--o{ SalesOrder : creates
    User ||--o{ Voucher : creates
    
    Supplier ||--o{ PurchaseOrder : supplies
    Supplier ||--o{ VendorPayment : receives
    
    Customer ||--o{ Quotation : requests
    Customer ||--o{ SalesOrder : places
    Customer ||--o{ SalesInvoice : receives
    Customer ||--o{ CustomerReceivable : owes
    
    Product ||--o{ PurchaseOrderItem : included_in
    Product ||--o{ SalesOrderItem : included_in
    Product ||--o{ QuotationItem : included_in
    
    PurchaseRequest ||--o{ PurchaseRequestItem : contains
    PurchaseOrder ||--o{ PurchaseOrderItem : contains
    PurchaseOrder ||--o{ VendorPayment : paid_by
    
    SalesOrder ||--o{ SalesOrderItem : contains
    SalesOrder ||--o{ SalesInvoice : generates
    SalesInvoice ||--o{ SalesInvoiceItem : contains
    SalesInvoice ||--o{ CustomerReceivable : creates
    
    Voucher ||--o{ VoucherEntry : contains
```

## 3. 功能模組規格

### 3.1 進貨循環模組

#### 3.1.1 請購單管理
**功能描述**: 管理採購申請流程

**業務流程圖**:
```mermaid
flowchart TD
    A[部門提出請購需求] --> B[填寫請購單]
    B --> C[提交審核]
    C --> D{主管審核}
    D -->|核准| E[轉為採購單]
    D -->|拒絕| F[退回修改]
    D -->|取消| G[請購單取消]
    F --> B
    E --> H[採購流程開始]
```

**循序圖**:
```mermaid
sequenceDiagram
    participant U as 申請人
    participant S as 系統
    participant M as 主管
    participant P as 採購部門

    U->>S: 創建請購單
    S->>S: 驗證資料
    S->>U: 返回請購單編號
    U->>S: 提交審核
    S->>M: 發送審核通知
    M->>S: 審核請購單
    alt 核准
        S->>P: 轉為採購單
        S->>U: 通知核准
    else 拒絕
        S->>U: 通知拒絕原因
        U->>S: 修改請購單
    end
```

**API 端點**:
- `GET /api/purchasing/requests` - 獲取請購單列表
- `POST /api/purchasing/requests` - 創建請購單
- `GET /api/purchasing/requests/[id]` - 獲取請購單詳情
- `PUT /api/purchasing/requests/[id]` - 更新請購單
- `DELETE /api/purchasing/requests/[id]` - 刪除請購單
- `POST /api/purchasing/requests/[id]/approve` - 核准請購單
- `POST /api/purchasing/requests/[id]/reject` - 拒絕請購單

#### 3.1.2 採購單管理
**功能描述**: 管理正式採購訂單

**業務流程圖**:
```mermaid
flowchart TD
    A[請購單核准] --> B[選擇供應商]
    B --> C[創建採購單]
    C --> D[發送給供應商]
    D --> E[供應商確認]
    E --> F[等待交貨]
    F --> G[收貨驗收]
    G --> H[更新庫存]
    H --> I[應付帳款]
```

**循序圖**:
```mermaid
sequenceDiagram
    participant P as 採購部門
    participant S as 系統
    participant V as 供應商
    participant W as 倉庫
    participant A as 會計部門

    P->>S: 創建採購單
    S->>V: 發送採購單
    V->>S: 確認採購單
    S->>P: 通知確認
    V->>W: 交貨
    W->>S: 登記收貨
    S->>A: 創建應付帳款
    A->>S: 確認入帳
```

#### 3.1.3 驗收單管理
**功能描述**: 管理收貨驗收流程

**循序圖**:
```mermaid
sequenceDiagram
    participant W as 倉庫人員
    participant S as 系統
    participant Q as 品管部門
    participant P as 採購部門

    W->>S: 登記收貨
    S->>Q: 通知品檢
    Q->>S: 品檢結果
    alt 合格
        S->>W: 確認入庫
        S->>P: 通知驗收完成
    else 不合格
        S->>P: 通知退貨
        P->>S: 處理退貨
    end
```

#### 3.1.4 廠商付款管理
**功能描述**: 管理應付帳款付款

**循序圖**:
```mermaid
sequenceDiagram
    participant A as 會計部門
    participant S as 系統
    participant M as 財務主管
    participant B as 銀行系統

    A->>S: 查詢應付帳款
    S->>A: 返回待付款項
    A->>S: 創建付款單
    S->>M: 送審付款單
    M->>S: 核准付款
    S->>B: 執行付款
    B->>S: 返回付款結果
    S->>A: 更新帳款狀態
```

### 3.2 銷貨循環模組

#### 3.2.1 報價單管理
**功能描述**: 管理客戶報價流程

**業務流程圖**:
```mermaid
flowchart TD
    A[客戶詢價] --> B[業務評估]
    B --> C[產品定價]
    C --> D[創建報價單]
    D --> E[發送給客戶]
    E --> F{客戶回覆}
    F -->|接受| G[轉為訂單]
    F -->|拒絕| H[報價結束]
    F -->|修改| I[調整報價]
    I --> D
```

**循序圖**:
```mermaid
sequenceDiagram
    participant C as 客戶
    participant S as 業務人員
    participant SYS as 系統
    participant M as 業務主管

    C->>S: 詢價需求
    S->>SYS: 創建報價單
    SYS->>SYS: 計算價格
    SYS->>M: 送審報價
    M->>SYS: 核准報價
    SYS->>S: 報價單完成
    S->>C: 發送報價單
    C->>S: 回覆結果
    alt 接受
        S->>SYS: 轉為銷貨訂單
    else 修改
        S->>SYS: 調整報價
    end
```

#### 3.2.2 銷貨訂單管理
**功能描述**: 管理客戶訂單流程

**循序圖**:
```mermaid
sequenceDiagram
    participant C as 客戶
    participant S as 業務人員
    participant SYS as 系統
    participant W as 倉庫
    participant F as 財務部門

    C->>S: 下訂單
    S->>SYS: 創建銷貨訂單
    SYS->>W: 檢查庫存
    W->>SYS: 庫存狀態
    alt 有庫存
        SYS->>W: 預留庫存
        SYS->>F: 創建應收帳款
    else 無庫存
        SYS->>S: 通知缺貨
        S->>C: 協商交期
    end
```

#### 3.2.3 銷貨發票管理
**功能描述**: 管理出貨發票

**循序圖**:
```mermaid
sequenceDiagram
    participant W as 倉庫
    participant SYS as 系統
    participant F as 財務部門
    participant C as 客戶

    W->>SYS: 確認出貨
    SYS->>F: 創建銷貨發票
    F->>SYS: 確認發票
    SYS->>C: 發送發票
    C->>SYS: 確認收到
```

#### 3.2.4 客戶應收帳款管理
**功能描述**: 管理應收帳款

**循序圖**:
```mermaid
sequenceDiagram
    participant F as 財務部門
    participant SYS as 系統
    participant C as 客戶
    participant B as 銀行

    F->>SYS: 查詢應收帳款
    SYS->>F: 返回帳款清單
    F->>C: 發送催款通知
    C->>B: 付款
    B->>SYS: 付款通知
    SYS->>F: 更新帳款狀態
```

### 3.3 總帳循環模組

#### 3.3.1 傳票管理
**功能描述**: 管理會計傳票

**業務流程圖**:
```mermaid
flowchart TD
    A[業務交易發生] --> B[確認會計科目]
    B --> C[創建傳票]
    C --> D[借貸分錄]
    D --> E{借貸平衡檢查}
    E -->|平衡| F[提交審核]
    E -->|不平衡| G[修正分錄]
    G --> D
    F --> H{會計主管審核}
    H -->|核准| I[過帳到總帳]
    H -->|拒絕| J[退回修改]
    J --> C
```

**循序圖**:
```mermaid
sequenceDiagram
    participant A as 會計人員
    participant SYS as 系統
    participant M as 會計主管
    participant GL as 總帳系統

    A->>SYS: 創建傳票
    SYS->>SYS: 驗證借貸平衡
    alt 平衡
        A->>SYS: 提交審核
        SYS->>M: 發送審核通知
        M->>SYS: 審核傳票
        alt 核准
            SYS->>GL: 過帳到總帳
            GL->>SYS: 確認過帳
            SYS->>A: 通知完成
        else 拒絕
            SYS->>A: 退回修改
        end
    else 不平衡
        SYS->>A: 要求修正
        A->>SYS: 修正分錄
    end
```

#### 3.3.2 總帳科目架構
**功能描述**: 管理會計科目架構

**科目架構圖**:
```mermaid
graph TD
    A[資產 1xxx] --> A1[流動資產 11xx]
    A --> A2[固定資產 12xx]
    A --> A3[其他資產 13xx]

    A1 --> A11[現金及約當現金 111x]
    A1 --> A12[應收帳款 112x]
    A1 --> A13[存貨 113x]

    B[負債 2xxx] --> B1[流動負債 21xx]
    B --> B2[長期負債 22xx]

    B1 --> B11[應付帳款 211x]
    B1 --> B12[應付薪資 212x]

    C[權益 3xxx] --> C1[股本 31xx]
    C --> C2[保留盈餘 32xx]

    D[收入 4xxx] --> D1[營業收入 41xx]
    D --> D2[營業外收入 42xx]

    E[費用 5xxx] --> E1[營業費用 51xx]
    E --> E2[營業外費用 52xx]
```

### 3.4 系統整體循序圖

#### 3.4.1 用戶登入流程
```mermaid
sequenceDiagram
    participant U as 用戶
    participant F as 前端
    participant A as 認證服務
    participant D as 資料庫

    U->>F: 輸入帳號密碼
    F->>A: 發送登入請求
    A->>D: 驗證用戶資料
    D->>A: 返回用戶資訊
    alt 驗證成功
        A->>F: 返回 JWT Token
        F->>U: 登入成功，跳轉主頁
    else 驗證失敗
        A->>F: 返回錯誤訊息
        F->>U: 顯示錯誤訊息
    end
```

#### 3.4.2 智能搜索流程
```mermaid
sequenceDiagram
    participant U as 用戶
    participant F as 前端
    participant AI as AI服務
    participant D as 資料庫

    U->>F: 輸入搜索查詢
    F->>AI: 發送查詢到 Genkit
    AI->>AI: 分析查詢意圖
    AI->>D: 查詢相關數據
    D->>AI: 返回數據結果
    AI->>F: 返回智能建議
    F->>U: 顯示搜索結果
```

### 3.5 系統類別圖

```mermaid
classDiagram
    class User {
        +id: string
        +username: string
        +email: string
        +role: string
        +createdAt: Date
        +login()
        +logout()
        +updateProfile()
    }

    class PurchaseRequest {
        +id: string
        +requestNumber: string
        +requestDate: Date
        +status: string
        +totalAmount: number
        +createRequest()
        +approve()
        +reject()
    }

    class PurchaseOrder {
        +id: string
        +orderNumber: string
        +orderDate: Date
        +supplierId: string
        +status: string
        +totalAmount: number
        +createOrder()
        +confirm()
        +cancel()
    }

    class SalesOrder {
        +id: string
        +orderNumber: string
        +orderDate: Date
        +customerId: string
        +status: string
        +totalAmount: number
        +createOrder()
        +ship()
        +invoice()
    }

    class Voucher {
        +id: string
        +voucherNumber: string
        +voucherDate: Date
        +description: string
        +totalDebit: number
        +totalCredit: number
        +createVoucher()
        +post()
        +reverse()
    }

    class Product {
        +id: string
        +productCode: string
        +productName: string
        +unitPrice: number
        +stockQuantity: number
        +updateStock()
        +calculateCost()
    }

    User ||--o{ PurchaseRequest : creates
    User ||--o{ PurchaseOrder : manages
    User ||--o{ SalesOrder : handles
    User ||--o{ Voucher : posts
    PurchaseRequest ||--|| PurchaseOrder : converts_to
    SalesOrder ||--o{ Product : contains
    PurchaseOrder ||--o{ Product : includes
```

## 4. 用戶界面設計

### 4.1 設計原則
- **一致性**: 統一的設計語言和交互模式
- **易用性**: 直觀的操作流程和清晰的信息架構
- **響應式**: 支持桌面和移動設備
- **無障礙**: 符合 WCAG 2.1 標準

### 4.2 色彩規範
- **主色**: Blue (#4681C4) - HSL: 205 65% 50%
- **背景色**: Light Gray (#F0F4F8) - HSL: 220 25% 97%
- **強調色**: Teal (#3E8A8A) - HSL: 175 50% 45%
- **成功色**: Green (#10B981)
- **警告色**: Yellow (#F59E0B)
- **錯誤色**: Red (#EF4444)

### 4.3 字體規範
- **標題字體**: 'Poppins', sans-serif
- **內文字體**: 'PT Sans', sans-serif
- **代碼字體**: 'Fira Code', monospace

## 5. API 設計規範

### 5.1 RESTful API 設計原則
- 使用標準 HTTP 方法 (GET, POST, PUT, DELETE)
- 統一的響應格式
- 適當的 HTTP 狀態碼
- 分頁和過濾支持

### 5.2 響應格式
```typescript
// 成功響應
{
  "success": true,
  "data": any,
  "message": string
}

// 錯誤響應
{
  "success": false,
  "error": string,
  "details": any
}

// 分頁響應
{
  "success": true,
  "data": any[],
  "pagination": {
    "total": number,
    "page": number,
    "pageSize": number,
    "totalPages": number,
    "hasNext": boolean,
    "hasPrev": boolean
  }
}
```

### 5.3 認證和授權
- JWT Token 認證
- 角色基礎訪問控制 (RBAC)
- API 速率限制

## 6. 數據庫設計

### 6.1 設計原則
- 正規化設計減少數據冗餘
- 適當的索引優化查詢性能
- 外鍵約束保證數據完整性
- 軟刪除支持數據恢復

### 6.2 核心實體
- **User**: 用戶管理
- **Product**: 產品主檔
- **Customer**: 客戶主檔
- **Supplier**: 供應商主檔
- **PurchaseOrder**: 採購單
- **SalesOrder**: 銷貨單
- **Voucher**: 會計傳票

## 7. 安全性設計

### 7.1 認證安全
- 密碼加密存儲 (bcrypt)
- JWT Token 有效期管理
- 登入失敗次數限制

### 7.2 數據安全
- SQL 注入防護 (Prisma ORM)
- XSS 攻擊防護
- CSRF 攻擊防護
- 敏感數據加密

### 7.3 訪問控制
- 角色權限管理
- 資源級別權限控制
- API 訪問日誌

## 8. 性能優化

### 8.1 前端優化
- 代碼分割和懶加載
- 圖片優化和 CDN
- 緩存策略
- Bundle 大小優化

### 8.2 後端優化
- 數據庫查詢優化
- 連接池管理
- 緩存機制 (Redis)
- API 響應壓縮

## 9. 測試策略

### 9.1 測試類型
- **單元測試**: Jest + React Testing Library
- **集成測試**: API 端點測試
- **端到端測試**: Playwright (未來)
- **性能測試**: 負載測試 (未來)

### 9.2 測試覆蓋率目標
- 單元測試覆蓋率 > 80%
- API 測試覆蓋率 > 90%
- 關鍵業務流程 100% 覆蓋

## 10. 部署和維運

### 10.1 部署環境
- **開發環境**: 本地開發
- **測試環境**: Staging 環境
- **生產環境**: 雲端部署

### 10.2 CI/CD 流程
- 代碼提交觸發自動測試
- 測試通過後自動部署到測試環境
- 手動審核後部署到生產環境

### 10.3 監控和日誌
- 應用性能監控 (APM)
- 錯誤追蹤和報警
- 業務指標監控
- 安全事件監控

## 11. 未來擴展

### 11.1 功能擴展
- 生產循環模組完整實現
- 成本循環模組
- 薪資循環模組
- 固定資產循環模組
- 現金流循環模組

### 11.2 技術擴展
- 微服務架構遷移
- 多租戶支持
- 國際化 (i18n)
- 移動應用開發

### 11.3 AI 功能擴展
- 智能報表生成
- 預測分析
- 異常檢測
- 自動化工作流程
