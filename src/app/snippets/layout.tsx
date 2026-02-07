export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen max-w-7xl mx-auto md:px-5 py-3">
      {children}
    </div>
  );
}
