
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold font-headline mb-6">登入 (Login)</h1>
      {/* Basic login form placeholder */}
      <div className="w-full max-w-xs p-6 bg-card rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="username">
            Username
          </label>
          <input 
            id="username" 
            type="text" 
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" 
            placeholder="Enter your username" 
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="password">
            Password
          </label>
          <input 
            id="password" 
            type="password" 
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" 
            placeholder="Enter your password" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
