# MDM Dashboard - Next.js SPA

A modern, fully-typed Next.js Single Page Application for iOS Mobile Device Management (MDM) with multi-tenant support and phone financing capabilities.

## 🚀 Features

- **Multi-Tenant Architecture**: Support for 8 Thai telecom operators
- **Device Management**: Real-time device monitoring and control
- **Phone Financing**: 3/6/12-month payment plans with interest tracking
- **Thai Language Support**: Device operations in Thai
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components
- **Type Safety**: Full TypeScript implementation
- **State Management**: Context API for global state
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **State Management**: React Context API

## 📁 Project Structure

```
mdm-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Dashboard.tsx   # Main dashboard component
│   │   ├── layout/         # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── views/          # View components
│   │   │   ├── OverviewView.tsx
│   │   │   ├── DevicesView.tsx
│   │   │   ├── FinancingView.tsx
│   │   │   └── PlaceholderView.tsx
│   │   └── modals/         # Modal components
│   │       └── DeviceOperationsModal.tsx
│   ├── contexts/
│   │   └── AppContext.tsx  # Global state management
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── data/
│   │   └── mockData.ts     # Mock data for development
│   └── lib/
│       └── utils.ts        # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mdm-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Features Overview

### Dashboard Overview
- Real-time statistics for devices, revenue, and compliance
- Recent activity feed
- Financing overview by plan type

### Device Management
- Device cards with detailed information
- Battery level and location tracking
- Financing status per device
- 22 Thai-language device operations
- Search and filter capabilities

### Financing Management
- Revenue tracking and analytics
- Payment schedule monitoring
- Plan breakdown (3/6/12 months)
- Collection rate tracking
- Overdue payment alerts

## 🔧 Development

### Adding New Views

1. Create a new view component in `src/components/views/`
2. Add the tab type to `TabType` in `src/types/index.ts`
3. Update the navigation in `src/components/layout/Sidebar.tsx`
4. Add the view case in `src/components/Dashboard.tsx`

### Adding New Device Operations

Update the `deviceOperations` array in `src/data/mockData.ts`:

```typescript
{
  id: 'operation_id',
  label: 'Operation Label',
  category: 'category_name'
}
```

## 🔐 Security Considerations

- Implement proper authentication before production use
- Add API integration with secure endpoints
- Implement role-based access control
- Secure sensitive device operations

## 🚧 Next Steps

1. **Backend Integration**: Connect to the MDM backend API
2. **Authentication**: Implement JWT-based authentication
3. **Real-time Updates**: Add WebSocket support for live device status
4. **Internationalization**: Full i18n support for Thai/English
5. **Testing**: Add unit and integration tests
6. **Error Handling**: Implement comprehensive error boundaries
7. **Performance**: Add data pagination and virtualization

## 📝 License

This project is part of the iOS MDM Backend system with multi-tenant financing capabilities.
