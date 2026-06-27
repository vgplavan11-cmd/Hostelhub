import { getStudentDetails } from "@/app/actions/student"
import { EmergencyButton } from "@/components/student/EmergencyButton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Home, Building, MapPin, Sparkles } from "lucide-react"

export default async function StudentOverview() {
  const details = await getStudentDetails();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome home, {details.user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground mt-2">Here is a quick overview of your hostel stay.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:scale-110 transition-transform" />
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <User className="h-4 w-4" />
              </div>
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Name</p>
              <p className="font-medium text-foreground">{details.user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email</p>
              <p className="font-medium text-foreground">{details.user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Status</p>
              <Badge variant="default" className="mt-1 bg-emerald-500 hover:bg-emerald-600 border-transparent shadow-sm">
                <Sparkles className="h-3 w-3 mr-1" /> Active Student
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Room Details Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full group-hover:scale-110 transition-transform" />
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                <Home className="h-4 w-4" />
              </div>
              Room Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {details.room ? (
              <>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Room Number</p>
                  <p className="font-bold text-3xl text-foreground text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    {details.room.roomNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Roommates</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.max(0, (details.room.occupants?.length || 1) - 1) }).map((_, i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground z-10">
                          {i+1}
                        </div>
                      ))}
                      {Array.from({ length: Math.max(0, details.room.capacity - (details.room.occupants?.length || 1)) }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-8 w-8 rounded-full border-2 border-background border-dashed bg-transparent flex items-center justify-center text-xs text-muted-foreground">
                          +
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium ml-2">
                      {Math.max(0, (details.room.occupants?.length || 1) - 1)} / {details.room.capacity - 1} Occupied
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-muted-foreground py-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Home className="h-6 w-6 opacity-40" />
                </div>
                <p className="font-medium">No room assigned yet.</p>
                <p className="text-sm mt-1 max-w-[200px]">Contact your warden for room allocation.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hostel Details Card */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full group-hover:scale-110 transition-transform" />
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <div className="h-8 w-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mr-3">
                <Building className="h-4 w-4" />
              </div>
              Hostel Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {details.hostel ? (
              <>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Hostel Name</p>
                  <p className="font-medium text-foreground">{details.hostel.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Location</p>
                  <div className="flex items-start mt-1 bg-muted/50 p-3 rounded-lg border border-border/50">
                    <MapPin className="mr-2 h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">{details.hostel.address}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-muted-foreground py-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Building className="h-6 w-6 opacity-40" />
                </div>
                <p className="font-medium">N/A</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 max-w-xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
          <h3 className="text-sm font-bold text-center text-destructive uppercase tracking-widest">Emergency</h3>
        </div>
        <div className="bg-destructive/5 rounded-2xl p-6 border border-destructive/10 text-center">
          <p className="text-sm text-muted-foreground mb-4">Pressing this button will instantly alert the warden and staff.</p>
          <EmergencyButton />
        </div>
      </div>
    </div>
  )
}
