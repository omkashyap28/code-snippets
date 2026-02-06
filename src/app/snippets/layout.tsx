import MainHeader from "@/components/main-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen container mx-auto px-4 sm:px-7 md:px-14 py-3">
      <MainHeader />
      {children}
    </div>
  );
}
