export function Footer() {
  return (
    <footer className="border-t bg-white py-8 print:hidden">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500 flex flex-col gap-1">
        <span>&copy; {new Date().getFullYear()} HostelHub. All rights reserved.</span>
        <span className="font-medium text-gray-400">Constructed under Xlr11</span>
      </div>
    </footer>
  )
}
