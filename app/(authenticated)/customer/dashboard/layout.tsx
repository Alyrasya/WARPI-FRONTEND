export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="font-sans bg-gray-100">
          {children}
        </body>
      </html>
    );
  }
  