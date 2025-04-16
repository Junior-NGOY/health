"use client"

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:py-10 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Consultation Médicale</h1>
      {children}
    </div>
  )
}