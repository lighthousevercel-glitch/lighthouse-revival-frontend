"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, TrendingUp, Calendar, QrCode, Download, AlertTriangle } from "lucide-react"

export function AttendanceManagement() {
  const attendanceData = [
    { week: "Week 1", English: 234, Tamil: 189, Hindi: 156, Malayalam: 203 },
    { week: "Week 2", English: 245, Tamil: 195, Hindi: 162, Malayalam: 198 },
    { week: "Week 3", English: 228, Tamil: 178, Hindi: 149, Malayalam: 215 },
    { week: "Week 4", English: 251, Tamil: 201, Hindi: 168, Malayalam: 207 },
  ]

  const absentees = [
    {
      name: "John Doe",
      service: "English",
      lastAttended: "2024-01-14",
      weeksAbsent: 2,
      phone: "+971-50-123-4567",
      status: "Contacted",
    },
    {
      name: "Sarah Wilson",
      service: "Tamil",
      lastAttended: "2024-01-07",
      weeksAbsent: 3,
      phone: "+971-55-987-6543",
      status: "Pending",
    },
    {
      name: "Michael Johnson",
      service: "English",
      lastAttended: "2024-01-21",
      weeksAbsent: 1,
      phone: "+971-52-456-7890",
      status: "Pending",
    },
  ]

  const todayAttendance = [
    { service: "English Service", time: "12:30 PM", present: 234, expected: 250, percentage: 93.6 },
    { service: "Tamil Service", time: "3:00 PM", present: 189, expected: 200, percentage: 94.5 },
    { service: "Malayalam Service", time: "3:00 PM", present: 203, expected: 210, percentage: 96.7 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Attendance Management</h2>
          <p className="text-muted-foreground">Track and manage church service attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <QrCode className="w-4 h-4" />
            Generate QR
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {todayAttendance.map((service, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{service.service}</CardTitle>
              <p className="text-sm text-muted-foreground">{service.time}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{service.present}</span>
                  <Badge variant={service.percentage >= 95 ? "default" : "secondary"}>{service.percentage}%</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {service.present} of {service.expected} expected
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance by Service</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="English" fill="#164e63" />
                <Bar dataKey="Tamil" fill="#8b5cf6" />
                <Bar dataKey="Hindi" fill="#06b6d4" />
                <Bar dataKey="Malayalam" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="English" stroke="#164e63" strokeWidth={2} />
                <Line type="monotone" dataKey="Tamil" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Hindi" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="Malayalam" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Absentee Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Absentee Follow-up
            </CardTitle>
            <p className="text-sm text-muted-foreground">Members who haven't attended recently</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="malayalam">Malayalam</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Send Reminders
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Last Attended</TableHead>
                <TableHead>Weeks Absent</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {absentees.map((member, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.service}</Badge>
                  </TableCell>
                  <TableCell>{member.lastAttended}</TableCell>
                  <TableCell>
                    <Badge variant={member.weeksAbsent >= 3 ? "destructive" : "secondary"}>
                      {member.weeksAbsent} weeks
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{member.phone}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "Contacted" ? "default" : "secondary"}>{member.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        WhatsApp
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total This Week", value: "892", icon: Users, color: "bg-primary" },
          { label: "Average Attendance", value: "223", icon: TrendingUp, color: "bg-green-500" },
          { label: "Absentees", value: "23", icon: AlertTriangle, color: "bg-yellow-500" },
          { label: "New Visitors", value: "12", icon: Calendar, color: "bg-blue-500" },
        ].map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
