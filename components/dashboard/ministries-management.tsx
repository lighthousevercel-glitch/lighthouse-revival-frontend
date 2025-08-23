"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Church, Users, Music, BookOpen, Heart, UserPlus, MapPin, Calendar } from "lucide-react"

export function MinistriesManagement() {
  const ministries = [
    {
      id: 1,
      name: "Choir Ministry",
      description: "Leading worship through music and song",
      leader: "Sarah Wilson",
      members: 24,
      category: "Worship",
      meetingDay: "Wednesday",
      meetingTime: "7:00 PM",
      location: "Main Hall",
      status: "Active",
      icon: Music,
    },
    {
      id: 2,
      name: "Teaching Ministry",
      description: "Bible teaching and discipleship",
      leader: "Pastor Michael",
      members: 12,
      category: "Teaching",
      meetingDay: "Tuesday",
      meetingTime: "6:30 PM",
      location: "Conference Room",
      status: "Active",
      icon: BookOpen,
    },
    {
      id: 3,
      name: "Outreach Ministry",
      description: "Community outreach and evangelism",
      leader: "Elder John",
      members: 18,
      category: "Outreach",
      meetingDay: "Saturday",
      meetingTime: "9:00 AM",
      location: "Community Center",
      status: "Active",
      icon: Heart,
    },
    {
      id: 4,
      name: "Prayer Ministry",
      description: "Intercession and prayer support",
      leader: "Elder Mary",
      members: 15,
      category: "Prayer",
      meetingDay: "Friday",
      meetingTime: "6:00 PM",
      location: "Prayer Room",
      status: "Active",
      icon: Church,
    },
    {
      id: 5,
      name: "Youth Ministry",
      description: "Ministry to young people and teenagers",
      leader: "David Thomas",
      members: 32,
      category: "Youth",
      meetingDay: "Sunday",
      meetingTime: "4:00 PM",
      location: "Youth Hall",
      status: "Active",
      icon: Users,
    },
  ]

  const deployments = [
    {
      member: "John Doe",
      ministry: "Choir Ministry",
      role: "Vocalist",
      dateAssigned: "2024-01-15",
      status: "Active",
      missionField: "English Service",
    },
    {
      member: "Sarah Wilson",
      ministry: "Teaching Ministry",
      role: "Bible Study Leader",
      dateAssigned: "2023-12-01",
      status: "Active",
      missionField: "Tamil Service",
    },
    {
      member: "Michael Johnson",
      ministry: "Outreach Ministry",
      role: "Team Leader",
      dateAssigned: "2024-01-08",
      status: "Active",
      missionField: "Community Outreach",
    },
    {
      member: "Priya Sharma",
      ministry: "Prayer Ministry",
      role: "Intercessor",
      dateAssigned: "2024-01-20",
      status: "Training",
      missionField: "Hindi Service",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Worship":
        return "bg-purple-100 text-purple-800"
      case "Teaching":
        return "bg-blue-100 text-blue-800"
      case "Outreach":
        return "bg-green-100 text-green-800"
      case "Prayer":
        return "bg-orange-100 text-orange-800"
      case "Youth":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Training":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ministries Management</h2>
          <p className="text-muted-foreground">Manage church ministries and member deployments</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Deploy Member
        </Button>
      </div>

      {/* Ministry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Ministries", value: ministries.length, icon: Church, color: "bg-primary" },
          {
            label: "Active Members",
            value: ministries.reduce((sum, m) => sum + m.members, 0),
            icon: Users,
            color: "bg-green-500",
          },
          {
            label: "Active Deployments",
            value: deployments.filter((d) => d.status === "Active").length,
            icon: UserPlus,
            color: "bg-blue-500",
          },
          {
            label: "In Training",
            value: deployments.filter((d) => d.status === "Training").length,
            icon: BookOpen,
            color: "bg-yellow-500",
          },
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

      {/* Ministries Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ministry Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry) => {
              const IconComponent = ministry.icon
              return (
                <Card key={ministry.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{ministry.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{ministry.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(ministry.category)}>{ministry.category}</Badge>
                      <Badge className={getStatusColor(ministry.status)}>{ministry.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{ministry.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {ministry.meetingDay}s at {ministry.meetingTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{ministry.location}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Leader:</span>
                        <span className="ml-1 font-medium">{ministry.leader}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Member Deployments */}
      <Card>
        <CardHeader>
          <CardTitle>Member Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Ministry</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Mission Field</TableHead>
                <TableHead>Date Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((deployment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{deployment.member}</TableCell>
                  <TableCell>{deployment.ministry}</TableCell>
                  <TableCell>{deployment.role}</TableCell>
                  <TableCell>{deployment.missionField}</TableCell>
                  <TableCell className="text-sm">{deployment.dateAssigned}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(deployment.status)}>{deployment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
