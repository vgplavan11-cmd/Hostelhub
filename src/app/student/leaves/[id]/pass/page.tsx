import { LeaveRequestRepository } from "@/lib/repositories/LeaveRequestRepository"
import { UserRepository } from "@/lib/repositories/UserRepository"
import { PrintButton } from "@/components/student/PrintButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export default async function LeavePassPage({ params }: { params: Promise<{ id: string }> }) {
  const leaveId = (await params).id
  const leave = await LeaveRequestRepository.findById(leaveId)
  
  if (!leave) {
    notFound()
  }

  const student = await UserRepository.findById(leave.studentId)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col items-center">
      <div className="w-full flex justify-end mb-4 print:hidden">
        <PrintButton />
      </div>

      <div className="print-area w-full max-w-md bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm print:shadow-none print:border-slate-300">
        <div className="text-center pt-8 pb-6 px-6">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-emerald-800 tracking-wider">
            HOSTELHUB LEAVE PASS
          </h1>
          <p className="text-slate-500 mt-3 text-sm">
            Please present this pass at the security gate when leaving and returning
          </p>
        </div>

        <div className="border-t border-slate-200 mx-6"></div>

        <div className="py-8 px-6 space-y-6 text-center">
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Student Name</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{student?.name || 'Student'}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Reason</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{leave.reason}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Duration</p>
            <p className="font-serif text-2xl font-bold text-slate-900">
              {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Status</p>
            <p className={`font-serif text-xl font-bold uppercase tracking-wider ${
              leave.status === 'approved' ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {leave.status}
            </p>
          </div>

          <div className="pt-6 pb-2 flex justify-center">
            <div className="border border-slate-200 rounded-2xl p-4 inline-flex flex-col items-center bg-white shadow-sm">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`Student: ${student?.name || 'Student'}\nReason: ${leave.reason}\nDuration: ${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()}\nStatus: ${leave.status.toUpperCase()}`)}`} 
                alt="QR Code" 
                className="w-32 h-32"
              />
              <p className="text-xs text-slate-500 font-mono mt-3">{leave.id.split('-')[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
