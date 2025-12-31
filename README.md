# 股票价格仪表板 (Stock Price Dashboard)

一个使用 React + TypeScript + Tailwind CSS 构建的现代化股票价格监控仪表板。

## 功能特性

### 核心功能 ✅
- ✅ 股票数据表格显示（股票代码、价格、涨跌幅）
- ✅ 使用 Tailwind CSS 的响应式设计
- ✅ 实时数据获取（基于 Finnhub API）

### 额外功能 🎁
- ✅ 加载状态指示（加载动画）
- ✅ 完整的错误处理（API 失败、无效股票代码等）
- ✅ 搜索功能（添加新股票到监控列表）
- ✅ 表格排序（点击表头可按股票代码、价格、涨跌幅排序）
- ✅ 交互式图表（使用 Chart.js 显示价格对比）
- ✅ 刷新数据功能
- ✅ 移除股票功能（点击标签上的 × 按钮）
- ✅ **自动刷新功能**（可配置时间间隔：10秒、30秒、1分钟、2分钟、5分钟）
- ✅ **本地存储**（自动保存股票列表到浏览器 localStorage）
- ✅ **数据导出**（导出为 CSV 格式）
- ✅ **价格趋势指示器**（上涨/下跌箭头图标）
- ✅ 美观的用户界面和流畅的交互体验

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Chart.js** - 图表库
- **Yahoo Finance API** - 免费股票数据 API（无需 API 密钥）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行项目

项目使用 **Yahoo Finance API** 获取真实的股票数据，**无需配置 API 密钥**，可以直接运行：

```bash
npm run dev
```

**数据说明**：
- 使用 Yahoo Finance 公开 API，无需注册或 API 密钥
- 获取真实的实时股票数据
- 如果 API 调用失败，会自动使用内置的演示数据作为备用方案

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 4. 构建生产版本

```bash
npm run build
```

构建产物将在 `dist` 目录中

### 5. 预览生产构建

```bash
npm run preview
```

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com/)
3. 导入您的 GitHub 仓库
4. Vercel 会自动检测 Vite 项目并配置构建设置
5. 如需配置环境变量，在项目设置中添加 `VITE_FINNHUB_API_KEY`

### Netlify 部署

1. 将代码推送到 GitHub 仓库
2. 访问 [Netlify](https://www.netlify.com/)
3. 选择 "New site from Git"
4. 连接您的 GitHub 仓库
5. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

### GitHub Pages 部署

1. 安装 `gh-pages` 包：
   ```bash
   npm install --save-dev gh-pages
   ```

2. 在 `package.json` 中添加部署脚本：
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. 在 `vite.config.ts` 中添加 base 路径（如果仓库名不是根路径）：
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. 运行部署：
   ```bash
   npm run deploy
   ```

## 使用说明

1. **查看默认股票**：应用启动时会自动加载 AAPL、GOOGL、MSFT、TSLA、AMZN 的数据
2. **添加新股票**：在搜索框中输入股票代码（如 AAPL、TSLA），点击"添加"按钮
3. **排序表格**：点击表格列头（股票代码、价格、涨跌幅）进行排序，再次点击可切换升序/降序
4. **查看图表**：图表会自动显示当前所有股票的价格对比，可以点击"隐藏图表"/"显示图表"切换
5. **刷新数据**：点击"刷新数据"按钮获取最新价格
6. **移除股票**：点击股票代码标签上的 × 按钮可以移除该股票

## API 限制

Finnhub 免费 API 的限制：
- 每分钟 60 次请求
- 实时数据有延迟（约 15 分钟）
- 仅限美国市场数据

如需更高频率或实时数据，请考虑升级到付费计划。

## 项目结构

```
stock-price-dashboard/
├── src/
│   ├── components/          # React 组件
│   │   ├── StockTable.tsx   # 股票数据表格
│   │   ├── StockChart.tsx   # 价格图表
│   │   └── SearchBar.tsx    # 搜索输入框
│   ├── services/            # API 服务
│   │   └── stockApi.ts      # 股票数据获取逻辑
│   ├── types/               # TypeScript 类型定义
│   │   └── stock.ts         # 股票数据类型
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目说明
```

## 许可证

MIT License

## 作者

康杰 (Kangjie)

---

**注意**：本项目仅用于演示和学习目的。股票数据仅供参考，不构成投资建议。

