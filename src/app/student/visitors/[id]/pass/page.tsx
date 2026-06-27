import { VisitorRepository } from "@/lib/repositories/VisitorRepository"
import { UserRepository } from "@/lib/repositories/UserRepository"
import { RoomRepository } from "@/lib/repositories/RoomRepository"
import { PrintButton } from "@/components/student/PrintButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export default async function VisitorPassPage({ params }: { params: Promise<{ id: string }> }) {
  const visitorId = (await params).id
  const visitor = await VisitorRepository.findById(visitorId)
  
  if (!visitor) {
    notFound()
  }

  const student = await UserRepository.findById(visitor.studentId)
  const room = await RoomRepository.findByStudent(visitor.studentId)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col items-center">
      <div className="w-full flex justify-end mb-4 print:hidden">
        <PrintButton />
      </div>

      <div className="print-area w-full max-w-md bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm print:shadow-none print:border-slate-300">
        <div className="text-center pt-8 pb-6 px-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-emerald-800 tracking-wider">
            HOSTELHUB VISITOR PASS
          </h1>
          <p className="text-slate-500 mt-3 text-sm">
            Please present this pass at the security gate
          </p>
        </div>

        <div className="border-t border-slate-200 mx-6"></div>

        <div className="py-8 px-6 space-y-6 text-center">
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Visitor Name</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{visitor.visitorName}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Relationship</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{visitor.relationship}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Date of Visit</p>
            <p className="font-serif text-2xl font-bold text-slate-900">
              {new Date(visitor.visitDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Status</p>
            <p className={`font-serif text-xl font-bold uppercase tracking-wider ${
              visitor.status === 'approved' ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {visitor.status}
            </p>
          </div>

          <div className="pt-6 pb-2 flex justify-center">
            <div className="border border-slate-200 rounded-2xl p-4 inline-flex flex-col items-center bg-white shadow-sm">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`Visitor: ${visitor.visitorName}\nVisiting: ${student?.name || 'Student'}\nRelationship: ${visitor.relationship}\nDate: ${new Date(visitor.visitDate).toLocaleDateString()}\nStatus: ${visitor.status.toUpperCase()}`)}`} 
                alt="QR Code" 
                className="w-32 h-32"
              />
              <p className="text-xs text-slate-500 font-mono mt-3">{visitor.id.split('-')[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
