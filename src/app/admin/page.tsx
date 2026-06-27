"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getDashboardStats } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, Home, Activity, FileText, TrendingUp, ArrowUpRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

export default function AdminOverview() {
  const [stats, setStats] = useState({ totalStudents: 0, totalRooms: 0, occupancyRate: 0, activeComplaints: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome to the HostelHub Admin Dashboard. Here's what's happening today.</p>
      </div>

      {!loading && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Total Students Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.totalStudents}</div>
                <p className="text-xs text-emerald-500 font-medium flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Total Rooms Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Rooms</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Home className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.totalRooms}</div>
                <p className="text-xs text-muted-foreground mt-1">Across 3 buildings</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Occupancy Rate Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
                <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats.occupancyRate}%</div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-3">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${stats.occupancyRate}%` }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Complaints Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-destructive/5 rounded-bl-full" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Complaints</CardTitle>
                <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center z-10">
                  <FileText className="h-4 w-4 text-destructive" />
                </div>
              </CardHeader>
              <CardContent className="z-10 relative">
                <div className="text-3xl font-bold text-foreground">{stats.activeComplaints}</div>
                <p className="text-xs text-destructive font-medium flex items-center mt-1">
                  Requires attention <ArrowUpRight className="h-3 w-3 ml-1" />
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Placeholder for Analytics Charts */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
      >
        <Card className="lg:col-span-4 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 m-4 rounded-xl">
            [Chart Integration Placeholder]
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <div className="flex-1 space-y-1">
                     <p className="text-sm font-medium leading-none">New student registered</p>
                     <p className="text-xs text-muted-foreground">2 hours ago</p>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  )
}
